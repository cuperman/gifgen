import { Headers } from 'node-fetch';
import { GiphyService } from '../../src/giphy-service/giphy-service';

import { nockBack } from '../config/nock-back';

const GIPHY_API_KEY_VARIABLE = 'GIPHY_API_KEY';

describe('GiphyService', () => {
  describe('success', () => {
    const giphyService = new GiphyService(process.env[GIPHY_API_KEY_VARIABLE] || '');

    describe('#getSearch', () => {
      it('fetches trending', async () => {
        const { nockDone } = await nockBack('giphy-service/search.json');
        const response = await giphyService.getSearch('ye');
        const body = await response.body;
        expect(body.data).toBeInstanceOf(Array);
        expect(body.data[0].url).toMatch(/https:\/\/giphy.com\/gifs\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });

    describe('#getTrending', () => {
      it('fetches trending', async () => {
        const { nockDone } = await nockBack('giphy-service/trending.json');
        const response = await giphyService.getTrending();
        const body = await response.body;
        expect(body.data).toBeInstanceOf(Array);
        expect(body.data[0].url).toMatch(/https:\/\/giphy.com\/gifs\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });

    describe('#getRandom', () => {
      it('fetches random with given tag', async () => {
        const { nockDone } = await nockBack('giphy-service/random.json');
        const response = await giphyService.getRandom('kanye west');
        const body = await response.body;
        expect(body).toEqual(expect.objectContaining({ data: expect.any(Object) }));
        expect(body.data.embed_url).toMatch(/https:\/\/giphy.com\/embed\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });

    describe('#getTranslate', () => {
      it('fetches translate with given search term', async () => {
        const { nockDone } = await nockBack('giphy-service/translate.json');
        const response = await giphyService.getTranslate('yeezus');
        const body = await response.body;
        expect(body).toEqual(expect.objectContaining({ data: expect.any(Object) }));
        expect(body.data.images.downsized.url).toMatch(/https:\/\/media\d?.giphy.com\/media\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });

      it('fetches translate with given weirdness', async () => {
        const { nockDone } = await nockBack('giphy-service/translate_with_weirdness.json');
        const response = await giphyService.getTranslate('yeezus', 8);
        const body = await response.body;
        expect(body).toEqual(expect.objectContaining({ data: expect.any(Object) }));
        expect(body.data.images.downsized.url).toMatch(/https:\/\/media\d?.giphy.com\/media\/.*/);
        expect(response.headers).toBeInstanceOf(Headers);
        nockDone();
      });
    });
  });

  describe('failure', () => {
    const giphyService = new GiphyService('invalid_key');

    it('throws an error', async () => {
      const { nockDone } = await nockBack('giphy-service/invalid_key.json');
      await expect(giphyService.getTrending()).rejects.toMatch(
        /Error when fetching from https:\/\/api\.giphy\.com\/v1\/gifs\/trending\?api_key=\w+&limit=1&rating=g \(401\)/
      );
      nockDone();
    });
  });
});
