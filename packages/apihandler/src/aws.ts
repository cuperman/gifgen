import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

function newSecretsManager() {
  const secretsmanager = new AWS.SecretsManager();

  if (process.env.AWS_XRAY_ENABLED === 'true') {
    AWSXRay.captureAWSClient(secretsmanager);
  }

  return secretsmanager;
}

export async function getSecretString(secretId: string) {
  const secretsmanager = newSecretsManager();

  const response = await secretsmanager
    .getSecretValue({
      SecretId: secretId
    })
    .promise();

  return response.SecretString;
}

export async function getSecretJson(secretId: string) {
  const secretString = await getSecretString(secretId);

  if (typeof secretString === 'undefined') {
    throw new Error(`Secret has no secret string: ${secretId}`);
  }

  return JSON.parse(secretString);
}
