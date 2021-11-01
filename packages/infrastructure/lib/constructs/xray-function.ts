import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export enum XrayLogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SILENT = 'silent'
}

export interface XrayFunctionProps extends lambda.FunctionProps {
  readonly xrayEnabled?: boolean;
  readonly xrayLogLevel?: XrayLogLevel;
}

export class XrayFunction extends lambda.Function {
  constructor(scope: cdk.Construct, id: string, props: XrayFunctionProps) {
    const tracing: lambda.Tracing =
      props.xrayEnabled || typeof props.xrayEnabled === 'undefined' ? lambda.Tracing.ACTIVE : lambda.Tracing.DISABLED;

    super(scope, id, {
      ...props,
      tracing
    });

    if (props?.xrayLogLevel) {
      this.addEnvironment('AWS_XRAY_ENABLED', 'true');
      this.addEnvironment('AWS_XRAY_LOG_LEVEL', props.xrayLogLevel);
    }

    this.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'));
  }
}
