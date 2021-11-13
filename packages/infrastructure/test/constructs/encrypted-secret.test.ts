import * as cdk from '@aws-cdk/core';
import { expect as expectCDK, haveResource, objectLike, ResourcePart, stringLike } from '@aws-cdk/assert';

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

  it('creates a secret with my secret string', () => {
    expectCDK(stack).to(
      haveResource('AWS::SecretsManager::Secret', {
        Description: 'My credentials',
        SecretString: '{"username":"kwest","password":"password"}'
      })
    );
  });

  it('destroys the secret on removal', () => {
    expectCDK(stack).to(
      haveResource(
        'AWS::SecretsManager::Secret',
        {
          Properties: objectLike({
            Description: 'My credentials'
          }),
          UpdateReplacePolicy: 'Delete',
          DeletionPolicy: 'Delete'
        },
        ResourcePart.CompleteDefinition
      )
    );
  });

  it('creates a kms key', () => {
    expectCDK(stack).to(
      haveResource('AWS::KMS::Key', {
        Description: 'Key to encrypt: My credentials'
      })
    );
  });

  it('destroys the key on removal', () => {
    expectCDK(stack).to(
      haveResource(
        'AWS::KMS::Key',
        {
          Properties: objectLike({
            Description: 'Key to encrypt: My credentials'
          }),
          UpdateReplacePolicy: 'Delete',
          DeletionPolicy: 'Delete'
        },
        ResourcePart.CompleteDefinition
      )
    );
  });

  it('encrypts the secret with the key', () => {
    expectCDK(stack).to(
      haveResource('AWS::SecretsManager::Secret', {
        Description: 'My credentials',
        KmsKeyId: {
          Ref: stringLike('SecretKey*')
        }
      })
    );
  });
});
