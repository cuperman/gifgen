import {
  Resource,
  ResourceProps,
  aws_kms as kms,
  aws_secretsmanager as secretsmanager,
  RemovalPolicy,
  aws_iam as iam
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

const KMS_DECRYPT_ACTIONS = ['kms:Decrypt'];
const SECRETS_MANAGER_READ_ACTIONS = ['secretsmanager:GetSecretValue', 'secretsmanager:DescribeSecret'];

export interface EncryptedSecretProps extends ResourceProps {
  readonly secretString: string;
  readonly description?: string;
}

export class EncryptedSecret extends Resource {
  readonly key: kms.IKey;
  readonly secret: secretsmanager.CfnSecret;

  constructor(scope: Construct, id: string, props: EncryptedSecretProps) {
    super(scope, id, props);

    this.key = new kms.Key(this, 'Key', {
      description: props?.description ? `Key to encrypt: ${props.description}` : undefined,
      removalPolicy: RemovalPolicy.DESTROY
    });

    this.secret = new secretsmanager.CfnSecret(this, 'Secret', {
      description: props?.description,
      secretString: props.secretString,
      kmsKeyId: this.key.keyId
    });
    this.secret.applyRemovalPolicy(RemovalPolicy.DESTROY);
  }

  get secretId() {
    return this.secret.ref;
  }

  get secretArn() {
    return this.secret.ref;
  }

  grantRead(grantable: iam.IGrantable) {
    grantable.grantPrincipal.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: KMS_DECRYPT_ACTIONS,
        resources: [this.key.keyArn]
      })
    );

    grantable.grantPrincipal.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: SECRETS_MANAGER_READ_ACTIONS,
        resources: [this.secretArn]
      })
    );
  }
}
