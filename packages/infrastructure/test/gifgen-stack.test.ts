import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { GifGenStack } from '../lib/gifgen-stack';

describe('GifGenStack', () => {
  const app = new cdk.App();
  const stack = new GifGenStack(app, 'GifGenStack');

  it('is empty', () => {
    expectCDK(stack).to(
      matchTemplate(
        {
          Resources: {}
        },
        MatchStyle.EXACT
      )
    );
  });
});
