import * as nock from 'nock';
import * as path from 'path';
import { GiphyService } from '../../src/giphy-service/giphy-service';

const GIPHY_API_KEY_VARIABLE = 'GIPHY_API_KEY';
if (typeof process.env[GIPHY_API_KEY_VARIABLE] === 'undefined') {
  console.warn(`${GIPHY_API_KEY_VARIABLE} not found in environment. Tests may fail to reach Giphy API.`);
}

describe('GiphyService', () => {
  describe('success', () => {
    const giphyService = new GiphyService(process.env[GIPHY_API_KEY_VARIABLE] || '');
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

    beforeAll(() => {
      nockBack.setMode('record');
    });

    afterAll(() => {
      nockBack.setMode('wild');
    });

    describe('#getTrending', () => {
      it('fetches trending', async () => {
        const { nockDone } = await nockBack('trending.json', nockOptions);
        const trending = await giphyService.getTrending();
        expect(trending.data[0].url).toMatch(/https:\/\/giphy.com\/gifs\/.*/);
        nockDone();
      });
    });

    describe('#getRandom', () => {
      it('fetches random with given tag', async () => {
        const { nockDone } = await nockBack('random.json', nockOptions);
        const random = await giphyService.getRandom('kanye west');
        expect(random.data.embed_url).toMatch(/https:\/\/giphy.com\/embed\/.*/);
        nockDone();
      });
    });

    describe('#getTranslate', () => {
      it('fetches translate with given search term', async () => {
        const { nockDone } = await nockBack('translate.json', nockOptions);
        const random = await giphyService.getTranslate('yeezus');
        expect(random.data.images.downsized.url).toMatch(/https:\/\/media\d?.giphy.com\/media\/.*/);
        nockDone();
      });
    });
  });

  describe('failure', () => {
    const giphyService = new GiphyService('bad key');

    it('throws an error', async () => {
      expect(giphyService.getTrending()).rejects.toEqual(
        'Error when fetching from https://api.giphy.com/v1/gifs/trending?api_key=bad+key&limit=1&rating=g'
      );
    });
  });
});
