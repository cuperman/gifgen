import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';

const HANDLER_CODE_PATH = path.dirname(require.resolve('@cuperman/gifgen-apihandler/package.json'));

export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  OFF = 'OFF'
}

function methodLoggingLevel(logLevel: LogLevel): apigw.MethodLoggingLevel {
  switch (logLevel) {
    case LogLevel.INFO:
      return apigw.MethodLoggingLevel.INFO;
    case LogLevel.ERROR:
      return apigw.MethodLoggingLevel.ERROR;
    case LogLevel.OFF:
      return apigw.MethodLoggingLevel.OFF;
  }
}

enum XrayLogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SILENT = 'silent'
}

function xrayLoggingLevel(logLevel: LogLevel): XrayLogLevel {
  switch (logLevel) {
    case LogLevel.INFO:
      return XrayLogLevel.INFO;
    case LogLevel.ERROR:
      return XrayLogLevel.ERROR;
    case LogLevel.OFF:
      return XrayLogLevel.SILENT;
  }
}

export interface GifGenStackProps extends cdk.StackProps {
  readonly enableMetrics?: boolean;
  readonly enableTracing?: boolean;
  readonly logLevel?: LogLevel;
}

export class GifGenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: GifGenStackProps) {
    super(scope, id, props);

    const restApi = new apigw.RestApi(this, 'RestApi', {
      binaryMediaTypes: ['*/*'],
      deployOptions: {
        metricsEnabled: props?.enableMetrics,
        tracingEnabled: props?.enableTracing,
        dataTraceEnabled: props?.enableTracing,
        loggingLevel: props?.logLevel && methodLoggingLevel(props.logLevel)
      }
    });

    const handlerRuntime = lambda.Runtime.NODEJS_14_X;
    const handlerCode = lambda.Code.fromAsset(HANDLER_CODE_PATH);
    const handlerEnvironment: { [name: string]: string } = {};

    if (props?.logLevel) {
      handlerEnvironment['AWS_XRAY_LOG_LEVEL'] = xrayLoggingLevel(props.logLevel);
    }

    // trending

    const handleTrending = new lambda.Function(this, 'HandleTrending', {
      runtime: handlerRuntime,
      code: handlerCode,
      environment: handlerEnvironment,
      handler: 'dist/src/index.handleTrending',
      tracing: props?.enableTracing ? lambda.Tracing.ACTIVE : undefined
    });
    handleTrending.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'));

    restApi.root.addResource('trending').addMethod('GET', new apigw.LambdaIntegration(handleTrending));

    // search

    const handleSearch = new lambda.Function(this, 'HandleSearch', {
      runtime: handlerRuntime,
      code: handlerCode,
      environment: handlerEnvironment,
      handler: 'dist/src/index.handleSearch',
      tracing: props?.enableTracing ? lambda.Tracing.ACTIVE : undefined
    });
    handleSearch.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'));

    restApi.root
      .addResource('search')
      .addResource('{term}')
      .addMethod('GET', new apigw.LambdaIntegration(handleSearch));

    // translate

    const handleTranslate = new lambda.Function(this, 'HandleTranslate', {
      runtime: handlerRuntime,
      code: handlerCode,
      environment: handlerEnvironment,
      handler: 'dist/src/index.handleTranslate',
      tracing: props?.enableTracing ? lambda.Tracing.ACTIVE : undefined
    });
    handleTranslate.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'));

    restApi.root
      .addResource('translate')
      .addResource('{term}')
      .addMethod('GET', new apigw.LambdaIntegration(handleTranslate));

    // random

    const handleRandom = new lambda.Function(this, 'HandleRandom', {
      runtime: handlerRuntime,
      code: handlerCode,
      environment: handlerEnvironment,
      handler: 'dist/src/index.handleRandom',
      tracing: props?.enableTracing ? lambda.Tracing.ACTIVE : undefined
    });
    handleRandom.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'));

    restApi.root.addResource('random').addResource('{tag}').addMethod('GET', new apigw.LambdaIntegration(handleRandom));
  }
}
