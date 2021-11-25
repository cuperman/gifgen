import * as logger from './logger';
import { getDocument, putDocument } from './aws';

export async function fetch(tableName: string, cacheKey: string, fetcher: () => Promise<any>): Promise<any> {
  logger.info('reading from cache', tableName, cacheKey);
  const readResponse = await getDocument(tableName, { cacheKey });

  if (readResponse.Item) {
    logger.info('cache hit');
    return readResponse.Item.cacheData;
  }

  logger.info('cache miss; fetching data');
  const fetchResponse = await fetcher();

  logger.info('fetch response', JSON.stringify(fetchResponse, null, 2));

  logger.info('writing to cache', tableName, cacheKey);
  await putDocument(tableName, {
    cacheKey,
    cacheData: fetchResponse
  });

  return fetchResponse;
}
