import fetch, { Headers } from 'node-fetch';
import { URL } from 'url';
import { Trending, Random, Translate, Search } from './types/response';

interface Response<T> {
  body: Promise<T>;
  headers: Headers;
}

export class GiphyService {
  private _baseGifUrl = 'https://api.giphy.com/v1/gifs';
  private _rating = 'g';
  private _limit = 1;
  private _apiKey: string;

  constructor(_apiKey: string) {
    this._apiKey = _apiKey;
  }

  async getSearch(searchTerm: string): Promise<Response<Search>> {
    return this.serviceCall(this.buildFullUrl('/search', { q: searchTerm })) as Promise<Response<Search>>;
  }

  async getTrending(): Promise<Response<Trending>> {
    return this.serviceCall(this.buildFullUrl('/trending')) as Promise<Response<Trending>>;
  }

  async getRandom(tag: string): Promise<Response<Random>> {
    return this.serviceCall(this.buildFullUrl('/random', { tag })) as Promise<Response<Random>>;
  }

  async getTranslate(searchTerm: string, weirdness?: number): Promise<Response<Translate>> {
    return this.serviceCall(
      this.buildFullUrl('/translate', { s: searchTerm, weirdness: weirdness?.toString() })
    ) as Promise<Response<Translate>>;
  }

  private buildFullUrl(path: string, searchParams: { [key: string]: string | undefined } = {}): string {
    const url = new URL(this._baseGifUrl + path);

    url.searchParams.append('api_key', this._apiKey);
    url.searchParams.append('limit', this._limit.toString());
    url.searchParams.append('rating', this._rating);

    if (searchParams) {
      for (let [key, value] of Object.entries(searchParams)) {
        if (value) {
          url.searchParams.append(key, value);
        }
      }
    }

    return url.toString();
  }

  private async serviceCall(url: string): Promise<Response<any>> {
    const response = await fetch(url, {
      compress: false
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw `Error when fetching from ${url} (${response.status})\n${errorBody}`;
    }

    return {
      body: response.json(),
      headers: response.headers
    };
  }
}
