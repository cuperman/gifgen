import fetch from 'node-fetch';
import { URL } from 'url';
import { TrendingResponse } from './types/trending-response';
import { RandomResponse } from './types/random-response';
import { TranslateResponse } from './types/translate-response';

export class GiphyService {
  private _baseGifUrl = 'https://api.giphy.com/v1/gifs';
  private _rating = 'g';
  private _limit = 1;
  private _apiKey: string;

  constructor(_apiKey: string) {
    this._apiKey = _apiKey;
  }

  async getTrending(): Promise<TrendingResponse> {
    return this.serviceCall(this.buildFullUrl('/trending')) as Promise<TrendingResponse>;
  }

  async getRandom(tag: string): Promise<RandomResponse> {
    return this.serviceCall(this.buildFullUrl('/random', { tag })) as Promise<RandomResponse>;
  }

  async getTranslate(searchTerm: string, weirdness?: number): Promise<TranslateResponse> {
    return this.serviceCall(
      this.buildFullUrl('/translate', { s: searchTerm, weirdness: weirdness?.toString() })
    ) as Promise<TranslateResponse>;
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

  private async serviceCall(url: string): Promise<any> {
    const response = await fetch(url, {
      compress: false
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw `Error when fetching from ${url} (${response.status})\n${errorBody}`;
    }

    return response.json();
  }
}
