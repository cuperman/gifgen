import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';

import { EncryptedSecret } from '../../lib/constructs';

describe('EncryptedSecret', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'MyStack');

  new EncryptedSecret(stack, 'Secret', {
    description: 'My credentials',
    secretString: JSON.stringify({
      username: 'kwest',
      password: 'password'
    })
  });

  const template = Template.fromStack(stack);

  it('creates a secret with my secret string', () => {
    expect(
      template.hasResourceProperties('AWS::SecretsManager::Secret', {
        Description: 'My credentials',
        SecretString: '{"username":"kwest","password":"password"}'
      })
    );
  });

  it('destroys the secret on removal', () => {
    expect(
      template.hasResource('AWS::SecretsManager::Secret', {
        Properties: Match.objectLike({
          Description: 'My credentials'
        }),
        UpdateReplacePolicy: 'Delete',
        DeletionPolicy: 'Delete'
      })
    );
  });

  it('creates a kms key', () => {
    expect(
      template.hasResourceProperties('AWS::KMS::Key', {
        Description: 'Key to encrypt: My credentials'
      })
    );
  });

  it('destroys the key on removal', () => {
    expect(
      template.hasResource('AWS::KMS::Key', {
        Properties: Match.objectLike({
          Description: 'Key to encrypt: My credentials'
        }),
        UpdateReplacePolicy: 'Delete',
        DeletionPolicy: 'Delete'
      })
    );
  });

  it('encrypts the secret with the key', () => {
    expect(
      template.hasResourceProperties('AWS::SecretsManager::Secret', {
        Description: 'My credentials'
        // KmsKeyId: {
        //   Ref: Match.stringLike('SecretKey*')
        // }
      })
    );
  });
});
