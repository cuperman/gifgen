import * as AWSXRay from 'aws-xray-sdk';

if (process.env.AWS_XRAY_ENABLED === 'true') {
  AWSXRay.captureHTTPsGlobal(require('https'));
  AWSXRay.capturePromise();
}

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import fetch, { Response } from 'node-fetch';

import { GiphyService } from './giphy-service';
import { getSecretJson } from './aws';

const GIPHY_SECRET_ID = process.env.GIPHY_SECRET_ID;

async function giphyApiToken(): Promise<string> {
  if (typeof GIPHY_SECRET_ID === 'undefined') {
    throw new Error('GIPHY_SECRET_ID required');
  }

  const secret = await getSecretJson(GIPHY_SECRET_ID);

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

function badRequest(): APIGatewayProxyResult {
  return {
    statusCode: 400,
    body: 'bad request'
  };
}

function errorResult(error?: any): APIGatewayProxyResult {
  return {
    statusCode: 500,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      error
    })
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

export async function handleTrending(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);
    const apiResponse = await giphyService.getTrending();
    const apiResponseBody = await apiResponse.body;

    const imageUrl = apiResponseBody.data.at(0)?.url;
    if (typeof imageUrl === 'undefined') {
      return errorResult('no results');
    }

    const imageResponse = await fetch(imageUrl);

    return imageResult(imageResponse);
  } catch (error) {
    return errorResult(error);
  }
}

export async function handleSearch(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('handleTranslate', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    const imageDetails = parseImageName(imageName);
    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);
    const apiResponse = await giphyService.getSearch(imageDetails.basename);
    const apiResponseBody = await apiResponse.body;

    const imageUrl = apiResponseBody.data.at(0)?.url;
    if (typeof imageUrl === 'undefined') {
      return errorResult('no results');
    }

    const imageResponse = await fetch(imageUrl);

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
    const imageDetails = parseImageName(imageName);
    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);
    const apiResponse = await giphyService.getTranslate(imageDetails.basename);
    const apiResponseBody = await apiResponse.body;
    const imageUrl = apiResponseBody.data.image_url;
    const imageResponse = await fetch(imageUrl);
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
    const imageDetails = parseImageName(imageName);
    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);
    const apiResponse = await giphyService.getRandom(imageDetails.basename);
    const apiResponseBody = await apiResponse.body;
    const imageUrl = apiResponseBody.data.image_url;
    const imageResponse = await fetch(imageUrl);
    return imageResult(imageResponse);
  } catch (error) {
    return errorResult(error);
  }
}
