import * as AWS from 'aws-sdk';

export async function getSecretString(secretId: string) {
  const secretsmanager = new AWS.SecretsManager();

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
