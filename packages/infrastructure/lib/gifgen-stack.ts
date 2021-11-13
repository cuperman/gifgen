import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';

import { LogLevel, toApigwLogLevel, toXrayLogLevel } from './logging';
import { XrayFunction, XrayFunctionProps, EncryptedSecret, MaskedParameter } from './constructs';

const HANDLER_CODE_PATH = path.dirname(require.resolve('@cuperman/gifgen-apihandler/package.json'));

export interface GifGenStackProps extends cdk.StackProps {
  readonly customDomain?: {
    readonly zoneName: string;
    readonly domainName: string;
  };
  readonly observability?: {
    readonly enableMetrics?: boolean;
    readonly enableTracing?: boolean;
    readonly logLevel?: LogLevel;
  };
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
        GIPHY_SECRET_ID: secret.secretId
      },
      xrayEnabled: !!props?.observability?.enableTracing,
      xrayLogLevel: props?.observability?.logLevel && toXrayLogLevel(props.observability.logLevel)
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

    const customDomain = props?.customDomain;
    if (customDomain) {
      const { zoneName, domainName } = customDomain;

      const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
        domainName: zoneName
      });

      const certificate = new acm.Certificate(this, 'Certificate', {
        domainName,
        validation: acm.CertificateValidation.fromDns(hostedZone)
      });

      const restApiDomainName = restApi.addDomainName('DomainName', {
        domainName,
        certificate
      });

      new route53.ARecord(this, 'ARecord', {
        zone: hostedZone,
        recordName: domainName,
        target: route53.RecordTarget.fromAlias(new targets.ApiGatewayDomain(restApiDomainName))
      });
    }
  }
}
