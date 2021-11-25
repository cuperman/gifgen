import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

import * as logger from './logger';

interface TraceableDocumentClient extends AWS.DynamoDB.DocumentClient {
  readonly service: AWS.DynamoDB;
}

function newDocumentClient() {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    service: new AWS.DynamoDB()
  });

  if (process.env.AWS_XRAY_ENABLED === 'true') {
    AWSXRay.captureAWSClient((documentClient as TraceableDocumentClient).service);
  }

  return documentClient;
}

export async function fetch(tableName: string, cacheKey: string, fetcher: () => Promise<any>): Promise<any> {
  const ddb = newDocumentClient();

  logger.info('reading from cache', tableName, cacheKey);
  const readResponse = await ddb
    .get({
      TableName: tableName,
      Key: {
        cacheKey
      }
    })
    .promise();

  if (readResponse.Item) {
    logger.info('cache hit');
    return readResponse.Item.cacheData;
  }

  logger.info('cache miss; fetching data');
  const fetchResponse = await fetcher();

  logger.info('fetch response', JSON.stringify(fetchResponse, null, 2));

  logger.info('writing to cache', tableName, cacheKey);
  await ddb
    .put({
      TableName: tableName,
      Item: {
        cacheKey,
        cacheData: fetchResponse
      }
    })
    .promise();

  return fetchResponse;
}
