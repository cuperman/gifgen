import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { GifGenStack } from '../lib/gifgen-stack';

describe('GifGenStack', () => {
  const app = new cdk.App();
  const stack = new GifGenStack(app, 'GifGenStack');

  it('has a rest api', () => {
    expectCDK(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  });
});
