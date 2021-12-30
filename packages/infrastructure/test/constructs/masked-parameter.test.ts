import * as cdk from 'aws-cdk-lib';

import { MaskedParameter } from '../../lib/constructs';

describe('MaskedParameter', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'MyStack');

  new MaskedParameter(stack, 'Param', {
    parameterName: 'MyParameter',
    description: 'This is my parameter'
  });

  const template = app.synth().stacks.find((stack) => {
    return stack.stackName === 'MyStack';
  })?.template;

  it('has a string parameter with echo disabled', () => {
    expect(template.Parameters).toHaveProperty('MyParameter', {
      Type: 'String',
      NoEcho: true,
      Description: 'This is my parameter'
    });
  });
});
