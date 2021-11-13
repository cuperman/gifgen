import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { expect as expectCDK, haveResource, objectLike, stringLike } from '@aws-cdk/assert';

import { XrayFunction, XrayLogLevel } from '../../lib/constructs';

describe('XrayFunction', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'MyStack');

  new XrayFunction(stack, 'Function', {
    runtime: lambda.Runtime.NODEJS_12_X,
    code: lambda.Code.fromInline('exports.handler = () => "Hello, World!"'),
    handler: 'index.handler',
    environment: {
      FOO: 'bar'
    },
    xrayEnabled: true,
    xrayLogLevel: XrayLogLevel.INFO
  });

  it('creates a lambda function with additional x-ray configuration', () => {
    expectCDK(stack).to(
      haveResource('AWS::Lambda::Function', {
        Handler: 'index.handler',
        TracingConfig: {
          Mode: 'Active'
        },
        Environment: {
          Variables: {
            FOO: 'bar',
            AWS_XRAY_ENABLED: 'true',
            AWS_XRAY_LOG_LEVEL: 'info'
          }
        }
      })
    );
  });

  it('grants the function x-ray write access', () => {
    expectCDK(stack).to(
      haveResource('AWS::IAM::Policy', {
        PolicyName: stringLike('FunctionServiceRole*'),
        PolicyDocument: objectLike({
          Statement: [
            {
              Effect: 'Allow',
              Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
              Resource: '*'
            }
          ]
        })
      })
    );
  });
});
