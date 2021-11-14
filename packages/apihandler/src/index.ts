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
import * as logger from './logger';

const GIPHY_SECRET_ID = process.env.GIPHY_SECRET_ID;

async function giphyApiToken(): Promise<string> {
  if (typeof GIPHY_SECRET_ID === 'undefined') {
    throw new Error('GIPHY_SECRET_ID required');
  }

  logger.info(`getting secret from "${GIPHY_SECRET_ID}"`);
  const secret = await getSecretJson(GIPHY_SECRET_ID);

  if (secret && secret.apiToken) {
    logger.info('success');
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
  logger.info('handleTrending', event);

  try {
    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    logger.info('getting trending image');
    const apiResponse = await giphyService.getTrending();
    logger.info('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    logger.info('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data[0]?.images.downsized.url;
    if (typeof imageUrl === 'undefined') {
      return errorResult('no results');
    }

    logger.info('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    logger.info('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    console.error('error', error);
    return errorResult(error);
  }
}

export async function handleSearch(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  logger.info('handleSearch', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    logger.info('parse image name', imageName);
    const imageDetails = parseImageName(imageName);
    logger.info('image details', imageDetails);

    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    logger.info(`searching for image of "${imageDetails.basename}"`);
    const apiResponse = await giphyService.getSearch(imageDetails.basename);
    logger.info('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    logger.info('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data[0]?.images.downsized.url;
    if (typeof imageUrl === 'undefined') {
      return errorResult('no results');
    }

    logger.info('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    logger.info('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    console.error('error', error);
    return errorResult(error);
  }
}

export async function handleTranslate(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  logger.info('handleTranslate', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    logger.info('parse image name', imageName);
    const imageDetails = parseImageName(imageName);
    logger.info('image details', imageDetails);

    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    logger.info(`translating "${imageDetails.basename}" to image`);
    const apiResponse = await giphyService.getTranslate(imageDetails.basename);
    logger.info('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    logger.info('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data.images.downsized.url;

    logger.info('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    logger.info('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    console.error('error', error);
    return errorResult(error);
  }
}

export async function handleRandom(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  logger.info('handleRandom', event);

  const imageName = event.pathParameters?.image;
  if (typeof imageName === 'undefined') {
    console.error('path param image undefined; bad request');
    return badRequest();
  }

  try {
    logger.info('parse image name', imageName);
    const imageDetails = parseImageName(imageName);
    logger.info('image details', imageDetails);

    const apiKey = await giphyApiToken();
    const giphyService = new GiphyService(apiKey);

    logger.info(`getting random image of "${imageDetails.basename}"`);
    const apiResponse = await giphyService.getRandom(imageDetails.basename);
    logger.info('api response', apiResponse);
    const apiResponseBody = await apiResponse.body;
    logger.info('api response body', JSON.stringify(apiResponseBody, null, 2));

    const imageUrl = apiResponseBody.data.images.downsized.url;

    logger.info('fetching image', imageUrl);
    const imageResponse = await fetch(imageUrl);
    logger.info('image response', imageResponse);

    return imageResult(imageResponse);
  } catch (error) {
    console.error('error', error);
    return errorResult(error);
  }
}
