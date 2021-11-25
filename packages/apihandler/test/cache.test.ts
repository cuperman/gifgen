import * as nock from 'nock';
import * as cache from '../src/cache';

describe('fetch', () => {
  const tableName = 'MyTable';
  const cacheKey = 'random/foo.gif?ts=1637851125';
  const fetcher = async () => {
    return {
      data: 'FETCHED_DATA'
    };
  };

  describe('when cache key exists', () => {
    it('returns cached data', async () => {
      const cacheGet = nock('https://dynamodb.us-east-1.amazonaws.com:443')
        .post('/', {
          TableName: tableName,
          Key: {
            cacheKey: {
              S: cacheKey
            }
          }
        })
        // returns data on hit
        .reply(200, {
          Item: {
            cacheData: {
              M: {
                data: {
                  S: 'CACHED_DATA'
                }
              }
            }
          }
        });

      const response = await cache.fetch(tableName, cacheKey, fetcher);

      expect(cacheGet.pendingMocks()).toHaveLength(0);
      expect(response).toEqual({
        data: 'CACHED_DATA'
      });
    });
  });

  describe('when cache key does not exist', () => {
    it('fetches, caches, and returns the data', async () => {
      const cacheGet = nock('https://dynamodb.us-east-1.amazonaws.com:443')
        .post('/', {
          TableName: tableName,
          Key: {
            cacheKey: {
              S: cacheKey
            }
          }
        })
        // returns empty object on miss
        .reply(200, {});

      const cachePut = nock('https://dynamodb.us-east-1.amazonaws.com:443')
        .post('/', {
          TableName: tableName,
          Item: {
            cacheKey: {
              S: cacheKey
            },
            cacheData: {
              M: {
                data: {
                  S: 'FETCHED_DATA'
                }
              }
            }
          }
        })
        // returns 200 on success
        .reply(200, {});

      const response = await cache.fetch(tableName, cacheKey, fetcher);

      expect(cacheGet.pendingMocks()).toHaveLength(0);
      expect(cachePut.pendingMocks()).toHaveLength(0);
      expect(response).toEqual({
        data: 'FETCHED_DATA'
      });
    });
  });
});
