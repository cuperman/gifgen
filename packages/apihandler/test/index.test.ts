import { nockBack } from './config/nock-back';
import { buildEvent } from './factories';
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
          // TODO: if removing the tapes, you need to make sure this doesn't match at first
          ts: '1637418597727'
        }
      });

      // TODO: how to test that image was fetched, cached, and returned?
      it('returns a gif on cache miss', async () => {
        const { nockDone } = await nockBack('index/handle-trending-cache-miss.json');
        const result = await handleTrending(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });

      // TODO: how to test that image was found in the cache and returned without fetching?
      it('returns a gif on cache hit', async () => {
        const { nockDone } = await nockBack('index/handle-trending-cache-hit.json');
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
          // TODO: if removing the tapes, you need to make sure this doesn't match at first
          ts: '1637418597727'
        }
      });

      // TODO: how to test that image was fetched, cached, and returned?
      it('returns a gif on cache miss', async () => {
        const { nockDone } = await nockBack('index/handle-search-cache-miss.json');
        const result = await handleSearch(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });

      // TODO: how to test that image was found in the cache and returned without fetching?
      it('returns a gif on cache hit', async () => {
        const { nockDone } = await nockBack('index/handle-search-cache-hit.json');
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
          // TODO: if removing the tapes, you need to make sure this doesn't match at first
          ts: '1637418597727'
        }
      });

      // TODO: how to test that image was fetched, cached, and returned?
      it('returns a gif on cache miss', async () => {
        const { nockDone } = await nockBack('index/handle-translate-cache-miss.json');
        const result = await handleTranslate(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });

      // TODO: how to test that image was found in the cache and returned without fetching?
      it('returns a gif on cache hit', async () => {
        const { nockDone } = await nockBack('index/handle-translate-cache-hit.json');
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
          // TODO: if removing the tapes, you need to make sure this doesn't match at first
          ts: '1637333680157'
        }
      });

      // TODO: how to test that image was fetched, cached, and returned?
      it('returns a gif on cache miss', async () => {
        const { nockDone } = await nockBack('index/handle-random-cache-miss.json');
        const result = await handleRandom(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });

      // TODO: how to test that image was found in the cache and returned without fetching?
      it('returns a gif on cache hit', async () => {
        const { nockDone } = await nockBack('index/handle-random-cache-hit.json');
        const result = await handleRandom(event);
        nockDone();

        expect(result.statusCode).toEqual(200);
        expect(result.headers).toHaveProperty('content-type', 'image/gif');
      });
    });
  });
});
