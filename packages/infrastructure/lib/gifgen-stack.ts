import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

import { LogLevel } from './logging';
import { EncryptedSecret, MaskedParameter, GifGenRestApi, RestApiCustomDomain } from './constructs';

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

    const cache = new dynamodb.Table(this, 'Cache', {
      partitionKey: {
        name: 'cacheKey',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    new cdk.CfnOutput(this, 'CacheTable', {
      value: cache.tableName
    });

    const restApi = new GifGenRestApi(this, 'RestApi', {
      restApiName: 'GifGenRestApi',
      giphySecret: secret,
      observability: props?.observability,
      cacheTable: cache
    });

    const customDomain = props?.customDomain;
    if (customDomain) {
      new RestApiCustomDomain(this, 'RestCustomDomain', {
        restApi,
        zoneName: customDomain.zoneName,
        domainName: customDomain.domainName
      });

      new cdk.CfnOutput(this, 'DomainName', {
        value: customDomain.domainName
      });
    }
  }
}
