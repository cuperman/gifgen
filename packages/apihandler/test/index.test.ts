import { handleRandom, handleSearch, handleTranslate, handleTrending } from '../src/index';
import { buildEvent } from './factories';

describe('handleRandom', () => {
  const event = buildEvent({
    pathParameters: {
      tag: 'foo'
    }
  });

  xit('returns 200', async () => {
    const result = await handleRandom(event);
    expect(result.statusCode).toEqual(200);
  });
});

describe('handleSearch', () => {
  const event = buildEvent({
    pathParameters: {
      term: 'foo'
    }
  });

  xit('returns 200', async () => {
    const result = await handleSearch(event);
    expect(result.statusCode).toEqual(200);
  });
});

describe('handleTranslate', () => {
  const event = buildEvent({
    pathParameters: {
      term: 'foo'
    }
  });

  xit('returns 200', async () => {
    const result = await handleTranslate(event);
    expect(result.statusCode).toEqual(200);
  });
});

describe('handleTrending', () => {
  const event = buildEvent();

  xit('returns 200', async () => {
    const result = await handleTrending(event);
    expect(result.statusCode).toEqual(200);
  });
});
