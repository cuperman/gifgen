import * as cdk from '@aws-cdk/core';

export interface MaskedParameterProps extends cdk.ResourceProps {
  readonly parameterName: string;
  readonly description?: string;
}

export class MaskedParameter extends cdk.Resource {
  readonly parameter: cdk.CfnParameter;

  constructor(scope: cdk.Construct, id: string, props: MaskedParameterProps) {
    super(scope, id, props);

    this.parameter = new cdk.CfnParameter(this, props.parameterName, {
      noEcho: true,
      description: props?.description
    });
  }

  get valueAsString() {
    return this.parameter.valueAsString;
  }
}
