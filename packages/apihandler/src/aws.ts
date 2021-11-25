import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

function newSecretsManager(): AWS.SecretsManager {
  const secretsmanager = new AWS.SecretsManager();

  if (process.env.AWS_XRAY_ENABLED === 'true') {
    AWSXRay.captureAWSClient(secretsmanager);
  }

  return secretsmanager;
}

export async function getSecretString(secretId: string): Promise<string> {
  const secretsmanager = newSecretsManager();

  const response = await secretsmanager
    .getSecretValue({
      SecretId: secretId
    })
    .promise();

  if (typeof response.SecretString === 'undefined') {
    throw new Error(`Secret has no secret string: ${secretId}`);
  }

  return response.SecretString;
}

export async function getSecretJson(secretId: string): Promise<any> {
  const secretString = await getSecretString(secretId);

  return JSON.parse(secretString);
}

interface TraceableDocumentClient extends AWS.DynamoDB.DocumentClient {
  readonly service: AWS.DynamoDB;
}

function newDocumentClient(): AWS.DynamoDB.DocumentClient {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    service: new AWS.DynamoDB()
  });

  if (process.env.AWS_XRAY_ENABLED === 'true') {
    AWSXRay.captureAWSClient((documentClient as TraceableDocumentClient).service);
  }

  return documentClient;
}

export async function getDocument(
  tableName: string,
  key: AWS.DynamoDB.DocumentClient.Key
): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
  const ddb = newDocumentClient();

  return ddb
    .get({
      TableName: tableName,
      Key: key
    })
    .promise();
}

export async function putDocument(
  tableName: string,
  item: AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap
): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
  const ddb = newDocumentClient();

  return ddb
    .put({
      TableName: tableName,
      Item: item
    })
    .promise();
}
