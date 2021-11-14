import { nockBack } from './config/nock-back';
import { buildEvent } from './factories';
import { handleTrending, handleSearch, handleTranslate, handleRandom } from '../src/index';

describe('index', () => {
  describe('handleTrending', () => {
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

  describe('handleSearch', () => {
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

  describe('handleTranslate', () => {
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

  describe('handleRandom', () => {
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
});
