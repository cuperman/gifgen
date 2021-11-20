import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as logger from './logger';

export async function fetch(tableName: string, cacheKey: string, fetcher: () => Promise<any>): Promise<any> {
  const ddb = new DynamoDB.DocumentClient();

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
