import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { DynamoDB, PutItemOutput } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  NativeAttributeValue,
  GetCommandOutput
} from '@aws-sdk/lib-dynamodb';
import * as AWSXRay from 'aws-xray-sdk';

const secretsmanager =
  process.env.AWS_XRAY_ENABLED === 'true'
    ? AWSXRay.captureAWSv3Client(new SecretsManagerClient({}))
    : new SecretsManagerClient({});

const ddbClient =
  process.env.AWS_XRAY_ENABLED === 'true' ? AWSXRay.captureAWSv3Client(new DynamoDB({})) : new DynamoDB({});

const ddb = DynamoDBDocumentClient.from(ddbClient);

export async function getSecretString(secretId: string): Promise<string> {
  const command = new GetSecretValueCommand({
    SecretId: secretId
  });

  const response = await secretsmanager.send(command);

  if (typeof response.SecretString === 'undefined') {
    throw new Error(`Secret has no secret string: ${secretId}`);
  }

  return response.SecretString;
}

export async function getSecretJson(secretId: string): Promise<any> {
  const secretString = await getSecretString(secretId);

  return JSON.parse(secretString);
}

export async function getDocument(
  tableName: string,
  key: Record<string, NativeAttributeValue>
): Promise<GetCommandOutput> {
  const command = new GetCommand({
    TableName: tableName,
    Key: key
  });

  return ddb.send(command);
}

export async function putDocument(
  tableName: string,
  item: Record<string, NativeAttributeValue>
): Promise<PutItemOutput> {
  const command = new PutCommand({
    TableName: tableName,
    Item: item
  });

  return ddb.send(command);
}
