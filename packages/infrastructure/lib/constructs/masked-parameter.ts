import { Resource, ResourceProps, CfnParameter } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface MaskedParameterProps extends ResourceProps {
  readonly parameterName: string;
  readonly description?: string;
}

export class MaskedParameter extends Resource {
  readonly parameter: CfnParameter;

  constructor(scope: Construct, id: string, props: MaskedParameterProps) {
    super(scope, id, props);

    this.parameter = new CfnParameter(this, props.parameterName, {
      noEcho: true,
      description: props?.description
    });
    this.parameter.overrideLogicalId(props.parameterName);
  }

  get valueAsString() {
    return this.parameter.valueAsString;
  }
}
