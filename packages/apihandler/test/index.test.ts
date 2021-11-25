import { nockBack } from './config/nock-back';
import { buildEvent } from './factories';

const cacheFetch = jest.fn();
jest.mock('../src/cache', () => {
  return {
    fetch: cacheFetch
  };
});

import { handleTrending, handleSearch, handleTranslate, handleRandom } from '../src/index';

describe('index', () => {
  describe('handleTrending', () => {
    describe('with no parameters', () => {
      const event = buildEvent();

      it('returns 200', async () => {
        const { nockDone } = await nockBack('index/handle-trending.json');
        const result = await handleTrending(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
      });

      it('is a gif', async () => {
        const { nockDone } = await nockBack('index/handle-trending.json');
        const result = await handleTrending(event);
        nockDone();

        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });

    describe('with cache key', () => {
      const event = buildEvent({
        queryStringParameters: {
          ts: '1637418597727'
        }
      });

      it('returns a gif', async () => {
        cacheFetch.mockResolvedValueOnce({
          data: [
            {
              images: {
                downsized: {
                  url: 'https://media2.giphy.com/media/HyHXcBQ8JPnfzzj0dU/giphy-downsized.gif?cid=eb479444gb4i09usz4yf4n3nvtsff22c7kmjpy52l2jl87i5&rid=giphy-downsized.gif&ct=g'
                }
              }
            }
          ]
        });

        const { nockDone } = await nockBack('index/handle-trending-cache.json');
        const result = await handleTrending(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });
  });

  describe('handleSearch', () => {
    describe('with image name', () => {
      const event = buildEvent({
        pathParameters: {
          image: 'kanye.gif'
        }
      });

      it('returns 200', async () => {
        const { nockDone } = await nockBack('index/handle-search.json');
        const result = await handleSearch(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
      });

      it('is a gif', async () => {
        const { nockDone } = await nockBack('index/handle-search.json');
        const result = await handleSearch(event);
        nockDone();

        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });

    describe('with image name and cache key', () => {
      const event = buildEvent({
        pathParameters: {
          image: 'kanye.gif'
        },
        queryStringParameters: {
          ts: '1637418597727'
        }
      });

      it('returns a gif on cache hit', async () => {
        cacheFetch.mockResolvedValueOnce({
          data: [
            {
              images: {
                downsized: {
                  url: 'https://media0.giphy.com/media/zMCfqXkwjmTO8/giphy.gif?cid=eb479444nr6u4sp7nlbqk8mnibvkoj3yp1bt6lnxo2u9v0pj&rid=giphy.gif&ct=g'
                }
              }
            }
          ]
        });

        const { nockDone } = await nockBack('index/handle-search-cache.json');
        const result = await handleSearch(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });
  });

  describe('handleTranslate', () => {
    describe('with image name', () => {
      const event = buildEvent({
        pathParameters: {
          image: 'kanye.gif'
        }
      });

      it('returns 200', async () => {
        const { nockDone } = await nockBack('index/handle-translate.json');
        const result = await handleTranslate(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
      });

      it('is a gif', async () => {
        const { nockDone } = await nockBack('index/handle-translate.json');
        const result = await handleTranslate(event);
        nockDone();

        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });

    describe('with image name and cache key', () => {
      const event = buildEvent({
        pathParameters: {
          image: 'kanye.gif'
        },
        queryStringParameters: {
          ts: '1637418597727'
        }
      });

      it('returns a gif', async () => {
        cacheFetch.mockResolvedValueOnce({
          data: {
            images: {
              downsized: {
                url: 'https://media0.giphy.com/media/UuJl0dTmrkJjy/giphy-downsized.gif?cid=eb47944429224dd36f3d907996fb7e3d9cf37a3a4b9951b5&rid=giphy-downsized.gif&ct=g'
              }
            }
          }
        });

        const { nockDone } = await nockBack('index/handle-translate-cache.json');
        const result = await handleTranslate(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });
  });

  describe('handleRandom', () => {
    describe('with image name', () => {
      const event = buildEvent({
        pathParameters: {
          image: 'kanye.gif'
        }
      });

      it('returns 200', async () => {
        const { nockDone } = await nockBack('index/handle-random.json');
        const result = await handleRandom(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
      });

      it('is a gif', async () => {
        const { nockDone } = await nockBack('index/handle-random.json');
        const result = await handleRandom(event);
        nockDone();

        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });

    describe('with image name and cache key', () => {
      const event = buildEvent({
        pathParameters: {
          image: 'kanye.gif'
        },
        queryStringParameters: {
          ts: '1637333680157'
        }
      });

      it('returns a gif', async () => {
        cacheFetch.mockResolvedValueOnce({
          data: {
            images: {
              downsized: {
                url: 'https://media2.giphy.com/media/1hM7FonDBb0p8HAzbV/giphy.gif?cid=eb4794446c9be43c28dc62b81383d9d9a50985fc94edef37&rid=giphy.gif&ct=g'
              }
            }
          }
        });

        const { nockDone } = await nockBack('index/handle-random-cache.json');
        const result = await handleRandom(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });
  });
});
