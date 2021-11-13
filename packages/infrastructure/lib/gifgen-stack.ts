import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

import { LogLevel, methodLoggingLevel, xrayLoggingLevel } from './logging';
import { XrayFunction, XrayFunctionProps, EncryptedSecret, MaskedParameter } from './constructs';

const HANDLER_CODE_PATH = path.dirname(require.resolve('@cuperman/gifgen-apihandler/package.json'));

export interface GifGenStackProps extends cdk.StackProps {
  readonly enableMetrics?: boolean;
  readonly enableTracing?: boolean;
  readonly logLevel?: LogLevel;
}

export class GifGenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: GifGenStackProps) {
    super(scope, id, props);

    const param = new MaskedParameter(this, 'Param', {
      parameterName: 'GiphyApiToken',
      description: 'API token used for Giphy API access'
    });

    const secret = new EncryptedSecret(this, 'Secret', {
      description: 'Giphy API credentials',
      secretString: JSON.stringify({
        apiToken: param.valueAsString
      })
    });

    new cdk.CfnOutput(this, 'GiphySecretId', {
      value: secret.secretId
    });

    const restApi = new apigw.RestApi(this, 'RestApi', {
      restApiName: 'GifGenRestApi',
      binaryMediaTypes: ['*/*'],
      deployOptions: {
        metricsEnabled: props?.enableMetrics,
        tracingEnabled: props?.enableTracing,
        dataTraceEnabled: props?.enableTracing,
        loggingLevel: props?.logLevel && methodLoggingLevel(props.logLevel)
      }
    });

    const handlerDefaults: XrayFunctionProps = {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(HANDLER_CODE_PATH),
      handler: 'index.handler',
      memorySize: 1024, // TODO: tune this
      timeout: cdk.Duration.seconds(60), // TODO: tune this
      environment: {
        GIPHY_SECRET_ID: secret.secretId
      },
      xrayEnabled: !!props?.enableTracing,
      xrayLogLevel: props?.logLevel && xrayLoggingLevel(props.logLevel)
    };

    const handleTrending = new XrayFunction(this, 'HandleTrending', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleTrending'
    });
    secret.grantRead(handleTrending);

    restApi.root.addResource('trending.gif').addMethod('GET', new apigw.LambdaIntegration(handleTrending));

    const handleSearch = new XrayFunction(this, 'HandleSearch', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleSearch'
    });
    secret.grantRead(handleSearch);

    restApi.root
      .addResource('search')
      .addResource('{image}')
      .addMethod('GET', new apigw.LambdaIntegration(handleSearch));

    const handleTranslate = new XrayFunction(this, 'HandleTranslate', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleTranslate'
    });
    secret.grantRead(handleTranslate);

    restApi.root
      .addResource('translate')
      .addResource('{image}')
      .addMethod('GET', new apigw.LambdaIntegration(handleTranslate));

    const handleRandom = new XrayFunction(this, 'HandleRandom', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleRandom'
    });
    secret.grantRead(handleRandom);

    restApi.root
      .addResource('random')
      .addResource('{image}')
      .addMethod('GET', new apigw.LambdaIntegration(handleRandom));
  }
}
