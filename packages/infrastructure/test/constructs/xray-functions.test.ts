import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';

const lambda = cdk.aws_lambda;

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

  const template = Template.fromStack(stack);

  it('creates a lambda function with additional x-ray configuration', () => {
    expect(
      template.hasResourceProperties('AWS::Lambda::Function', {
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
    expect(
      template.hasResourceProperties('AWS::IAM::Policy', {
        // PolicyName: Match.stringLike('FunctionServiceRole*'),
        PolicyDocument: Match.objectLike({
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
