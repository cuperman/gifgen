import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { GifGenStack } from '../lib/gifgen-stack';
import { LogLevel } from '../lib/logging';

describe('GifGenStack', () => {
  describe('with default props', () => {
    const app = new cdk.App();
    const stack = new GifGenStack(app, 'GifGenStackDefault');
    const template = Template.fromStack(stack);

    it('has a rest api with binary media types', () => {
      expect(
        template.hasResourceProperties('AWS::ApiGateway::RestApi', {
          BinaryMediaTypes: ['*/*']
        })
      );
    });

    it('has a production stage', () => {
      expect(
        template.hasResourceProperties('AWS::ApiGateway::Stage', {
          StageName: 'prod'
        })
      );
    });
  });

  describe('with debugging', () => {
    const app = new cdk.App();
    const stack = new GifGenStack(app, 'GifGenStackWithDebugging', {
      observability: {
        enableMetrics: true,
        enableTracing: true,
        logLevel: LogLevel.INFO
      }
    });
    const template = Template.fromStack(stack);

    it('adds debug configurations to production stage', () => {
      expect(
        template.hasResourceProperties('AWS::ApiGateway::Stage', {
          StageName: 'prod',
          TracingEnabled: true,
          MethodSettings: [
            {
              HttpMethod: '*',
              ResourcePath: '/*',
              MetricsEnabled: true,
              DataTraceEnabled: true,
              LoggingLevel: 'INFO'
            }
          ]
        })
      );
    });

    it('adds debug configurations to lambda functions', () => {
      expect(
        template.hasResourceProperties('AWS::Lambda::Function', {
          Handler: 'dist/src/index.handleRandom',
          TracingConfig: {
            Mode: 'Active'
          },
          Environment: {
            Variables: {
              LOG_LEVEL: 'INFO',
              AWS_XRAY_LOG_LEVEL: 'info'
            }
          }
        })
      );
    });

    it('grants lambda functions xray write access', () => {
      expect(
        template.hasResourceProperties('AWS::IAM::Role', {
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Principal: {
                  Service: 'lambda.amazonaws.com'
                },
                Effect: 'Allow',
                Action: 'sts:AssumeRole'
              }
            ]
          },
          ManagedPolicyArns: [
            {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition'
                  },
                  ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
                ]
              ]
            },
            {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition'
                  },
                  ':iam::aws:policy/AWSXRayDaemonWriteAccess'
                ]
              ]
            }
          ]
        })
      );
    });
  });
});
