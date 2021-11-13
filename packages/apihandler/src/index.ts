import * as AWSXRay from 'aws-xray-sdk';

if (process.env.AWS_XRAY_ENABLED === 'true') {
  AWSXRay.captureHTTPsGlobal(require('https'));
  AWSXRay.capturePromise();
}

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import fetch, { Response } from 'node-fetch';

import { GiphyService } from './giphy-service';
import { getSecretJson } from './aws';
import { badRequest } from './http-responses';

const GIPHY_SECRET_ID = process.env.GIPHY_SECRET_ID;

async function giphyApiToken(): Promise<string> {
  if (typeof GIPHY_SECRET_ID === 'undefined') {
    throw new Error('GIPHY_SECRET_ID required');
  }

  console.log(`getting secret from "${GIPHY_SECRET_ID}"`);
  const secret = await getSecretJson(GIPHY_SECRET_ID);

  if (secret && secret.apiToken) {
    console.log('success');
  }

  return secret.apiToken;
}

function parseImageName(imageName: string): { basename: string; extension: string } {
  const match = imageName.match(/([\w%]+)(\.gif)?/);

  if (!match) {
    throw new Error(`invalid image name: ${imageName}`);
  }

  return {
    basename: match[1],
    extension: 'gif'
  };
}

function errorResult(error?: any): APIGatewayProxyResult {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify({
      error
    });
  }

  return {
    statusCode: 500,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: message
  };
}

async function imageResult(imageResponse: Response): Promise<APIGatewayProxyResult> {
  if (!imageResponse.ok) {
    console.error(`image response not ok; ${imageResponse.statusText}`);
    return {
      statusCode: imageResponse.status,
      body: `giphy image request failed with ${imageResponse.status} ${imageResponse.statusText}`
    };
  }

  const imageBuffer = await imageResponse.buffer();
  const imageHeaders: {
    [header: string]: boolean | number | string;
  } = {};

  imageResponse.headers.forEach((value, name) => {
    imageHeaders[name] = value;
  });

  return {
    statusCode: imageResponse.status,
    headers: imageHeaders,
    body: imageBuffer.toString('base64'),
    isBase64Encoded: true
  };
}

export async function handleTrending(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('handleTrending', event);

  try {
    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    console.log('getting trending image');
    const apiResponse = await giphyService.getTrending();
    console.log('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    console.log('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data[0]?.images.downsized.url;
    if (typeof imageUrl === 'undefined') {
      return errorResult('no results');
    }

    console.log('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    console.log('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    return errorResult(error);
  }
}

export async function handleSearch(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('handleSearch', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    console.log('parse image name', imageName);
    const imageDetails = parseImageName(imageName);
    console.log('image details', imageDetails);

    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    console.log(`searching for image of "${imageDetails.basename}"`);
    const apiResponse = await giphyService.getSearch(imageDetails.basename);
    console.log('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    console.log('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data[0]?.images.downsized.url;
    if (typeof imageUrl === 'undefined') {
      return errorResult('no results');
    }

    console.log('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    console.log('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    return errorResult(error);
  }
}

export async function handleTranslate(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('handleTranslate', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    console.log('parse image name', imageName);
    const imageDetails = parseImageName(imageName);
    console.log('image details', imageDetails);

    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    console.log(`translating "${imageDetails.basename}" to image`);
    const apiResponse = await giphyService.getTranslate(imageDetails.basename);
    console.log('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    console.log('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data.images.downsized.url;

    console.log('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    console.log('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    return errorResult(error);
  }
}

export async function handleRandom(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('handleRandom', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    console.log('parse image name', imageName);
    const imageDetails = parseImageName(imageName);
    console.log('image details', imageDetails);

    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    console.log(`getting random image of "${imageDetails.basename}"`);
    const apiResponse = await giphyService.getRandom(imageDetails.basename);
    console.log('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    console.log('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data.images.downsized.url;

    console.log('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    console.log('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    return errorResult(error);
  }
}
