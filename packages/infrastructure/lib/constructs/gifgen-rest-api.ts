import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

import { LogLevel, toApigwLogLevel, toXrayLogLevel } from '../logging';
import { XrayFunction, XrayFunctionProps } from './xray-function';
import { EncryptedSecret } from './encrypted-secret';

const HANDLER_CODE_PATH = path.dirname(require.resolve('@cuperman/gifgen-apihandler/package.json'));

export interface GifGenRestApiProps extends cdk.ResourceProps {
  readonly restApiName: string;
  readonly giphySecret: EncryptedSecret;
  readonly observability?: {
    readonly enableMetrics?: boolean;
    readonly enableTracing?: boolean;
    readonly logLevel?: LogLevel;
  };
  readonly cacheTable: dynamodb.ITable;
}

export class GifGenRestApi extends apigw.RestApi {
  constructor(scope: cdk.Construct, id: string, props: GifGenRestApiProps) {
    super(scope, id, {
      restApiName: props.restApiName,
      binaryMediaTypes: ['*/*'],
      deployOptions: {
        metricsEnabled: props?.observability?.enableMetrics,
        tracingEnabled: props?.observability?.enableTracing,
        dataTraceEnabled: props?.observability?.enableTracing,
        loggingLevel: props?.observability?.logLevel && toApigwLogLevel(props.observability.logLevel)
      }
    });

    const handlerDefaults: XrayFunctionProps = {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(HANDLER_CODE_PATH),
      handler: 'index.handler',
      memorySize: 1024, // TODO: tune this
      timeout: cdk.Duration.seconds(60), // TODO: tune this
      environment: {
        GIPHY_SECRET_ID: props.giphySecret.secretId,
        LOG_LEVEL: props?.observability?.logLevel || LogLevel.ERROR,
        CACHE_TABLE: props.cacheTable.tableName
      },
      xrayEnabled: !!props?.observability?.enableTracing,
      xrayLogLevel: props?.observability?.logLevel && toXrayLogLevel(props.observability.logLevel)
    };

    const handleTrending = new XrayFunction(this, 'HandleTrending', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleTrending'
    });
    props.giphySecret.grantRead(handleTrending);
    props.cacheTable.grantReadWriteData(handleTrending);

    this.root.addResource('trending.gif').addMethod('GET', new apigw.LambdaIntegration(handleTrending));

    const handleSearch = new XrayFunction(this, 'HandleSearch', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleSearch'
    });
    props.giphySecret.grantRead(handleSearch);
    props.cacheTable.grantReadWriteData(handleSearch);

    this.root.addResource('search').addResource('{image}').addMethod('GET', new apigw.LambdaIntegration(handleSearch));

    const handleTranslate = new XrayFunction(this, 'HandleTranslate', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleTranslate'
    });
    props.giphySecret.grantRead(handleTranslate);
    props.cacheTable.grantReadWriteData(handleTranslate);

    this.root
      .addResource('translate')
      .addResource('{image}')
      .addMethod('GET', new apigw.LambdaIntegration(handleTranslate));

    const handleRandom = new XrayFunction(this, 'HandleRandom', {
      ...handlerDefaults,
      handler: 'dist/src/index.handleRandom'
    });
    props.giphySecret.grantRead(handleRandom);
    props.cacheTable.grantReadWriteData(handleRandom);

    this.root.addResource('random').addResource('{image}').addMethod('GET', new apigw.LambdaIntegration(handleRandom));
  }
}
