import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { GifGenStack, LogLevel } from '../lib/gifgen-stack';

describe('GifGenStack', () => {
  const app = new cdk.App();

  describe('with default props', () => {
    const stack = new GifGenStack(app, 'GifGenStackDefault');

    it('has a rest api with binary media types', () => {
      expectCDK(stack).to(
        haveResource('AWS::ApiGateway::RestApi', {
          BinaryMediaTypes: ['*/*']
        })
      );
    });

    it('has a production stage', () => {
      expectCDK(stack).to(
        haveResource('AWS::ApiGateway::Stage', {
          StageName: 'prod'
        })
      );
    });
  });

  describe('with debugging', () => {
    const stack = new GifGenStack(app, 'GifGenStackWithDebugging', {
      enableMetrics: true,
      enableTracing: true,
      logLevel: LogLevel.INFO
    });

    it('adds debug configurations to production stage', () => {
      expectCDK(stack).to(
        haveResource('AWS::ApiGateway::Stage', {
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
      expectCDK(stack).to(
        haveResource('AWS::Lambda::Function', {
          Handler: 'dist/src/index.handleRandom',
          TracingConfig: {
            Mode: 'Active'
          },
          Environment: {
            Variables: {
              AWS_XRAY_LOG_LEVEL: 'info'
            }
          }
        })
      );
    });

    it('grants lambda functions xray write access', () => {
      expectCDK(stack).to(
        haveResource('AWS::IAM::Role', {
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
