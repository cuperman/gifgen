import { Stack, StackProps, aws_dynamodb as dynamodb, CfnOutput, RemovalPolicy, SecretValue } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

import { LogLevel } from './logging';
import { MaskedParameter, GifGenRestApi, RestApiCustomDomain } from './constructs';

export interface GifGenStackProps extends StackProps {
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

export class GifGenStack extends Stack {
  constructor(scope: Construct, id: string, props?: GifGenStackProps) {
    super(scope, id, props);

    const param = new MaskedParameter(this, 'Param', {
      parameterName: 'GiphyApiToken',
      description: 'API token used for Giphy API access'
    });

    const secret = new Secret(this, 'Secret', {
      description: 'Giphy API credentials',
      secretObjectValue: {
        apiToken: SecretValue.unsafePlainText(param.valueAsString)
      }
    });

    new CfnOutput(this, 'GiphySecretId', {
      value: secret.secretArn
    });

    const cache = new dynamodb.Table(this, 'Cache', {
      partitionKey: {
        name: 'cacheKey',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY
    });

    new CfnOutput(this, 'CacheTable', {
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

      new CfnOutput(this, 'DomainName', {
        value: customDomain.domainName
      });
    }
  }
}
