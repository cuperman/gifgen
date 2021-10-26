import * as nock from 'nock';
import { Headers } from 'node-fetch';
import * as path from 'path';
import { GiphyService } from '../../src/giphy-service/giphy-service';

const GIPHY_API_KEY_VARIABLE = 'GIPHY_API_KEY';

describe('GiphyService', () => {
  const nockBack = nock.back;
  nockBack.fixtures = path.join(__dirname, '__tapes__');

  const nockOptions: nock.BackOptions = {
    after: (scope: nock.Scope) => {
      scope.filteringPath(/api_key=\w*/, 'api_key=HIDDEN_CREDENTIALS');
    },
    afterRecord: (defs: nock.Definition[]) => {
      defs.forEach((def) => (def.path = def.path.replace(/api_key=\w*/, 'api_key=HIDDEN_CREDENTIALS')));
      return defs;
    }
  };

  beforeEach(() => {
    nockBack.setMode('record');
  });

  afterEach(() => {
    nockBack.setMode('wild');
  });

  describe('success', () => {
    const giphyService = new GiphyService(process.env[GIPHY_API_KEY_VARIABLE] || '');

    describe('#getSearch', () => {
      it('fetches trending', async () => {
        const { nockDone } = await nockBack('search.json', nockOptions);
        const response = await giphyService.getSearch('ye');
        const responseBody = await response.responseBody;
        expect(responseBody.data).toBeInstanceOf(Array);
        expect(responseBody.data[0].url).toMatch(/https:\/\/giphy.com\/gifs\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });

    describe('#getTrending', () => {
      it('fetches trending', async () => {
        const { nockDone } = await nockBack('trending.json', nockOptions);
        const response = await giphyService.getTrending();
        const responseBody = await response.responseBody;
        expect(responseBody.data).toBeInstanceOf(Array);
        expect(responseBody.data[0].url).toMatch(/https:\/\/giphy.com\/gifs\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });

    describe('#getRandom', () => {
      it('fetches random with given tag', async () => {
        const { nockDone } = await nockBack('random.json', nockOptions);
        const response = await giphyService.getRandom('kanye west');
        const responseBody = await response.responseBody;
        expect(responseBody).toEqual(expect.objectContaining({ data: expect.any(Object) }));
        expect(responseBody.data.embed_url).toMatch(/https:\/\/giphy.com\/embed\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });

    describe('#getTranslate', () => {
      it('fetches translate with given search term', async () => {
        const { nockDone } = await nockBack('translate.json', nockOptions);
        const response = await giphyService.getTranslate('yeezus');
        const responseBody = await response.responseBody;
        expect(responseBody).toEqual(expect.objectContaining({ data: expect.any(Object) }));
        expect(responseBody.data.images.downsized.url).toMatch(/https:\/\/media\d?.giphy.com\/media\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });

      it('fetches translate with given weirdness', async () => {
        const { nockDone } = await nockBack('translate_with_weirdness.json', nockOptions);
        const response = await giphyService.getTranslate('yeezus', 8);
        const responseBody = await response.responseBody;
        expect(responseBody).toEqual(expect.objectContaining({ data: expect.any(Object) }));
        expect(responseBody.data.images.downsized.url).toMatch(/https:\/\/media\d?.giphy.com\/media\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });
  });

  describe('failure', () => {
    const giphyService = new GiphyService('invalid_key');

    it('throws an error', async () => {
      const { nockDone } = await nockBack('invalid_key.json');
      await expect(giphyService.getTrending()).rejects.toEqual(
        'Error when fetching from https://api.giphy.com/v1/gifs/trending?api_key=invalid_key&limit=1&rating=g (403)\n{"message":"Invalid authentication credentials"}'
      );
      nockDone();
    });
  });
});
