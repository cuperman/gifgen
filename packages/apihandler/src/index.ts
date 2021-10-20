import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handleTrending(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const data = ''; // get data from trending api
  const buffer = Buffer.from(data, 'utf8');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
}

export async function handleSearch(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (typeof event.pathParameters?.term === 'undefined') {
    return {
      statusCode: 400,
      body: 'bad request'
    };
  }

  const term = event.pathParameters.term;
  console.log('search term', term);

  const data = ''; // get data from search api
  const buffer = Buffer.from(data, 'utf8');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
}

export async function handleTranslate(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (typeof event.pathParameters?.term === 'undefined') {
    return {
      statusCode: 400,
      body: 'bad request'
    };
  }

  const term = event.pathParameters.term;
  console.log('search term', term);

  const data = ''; // get data from translate api
  const buffer = Buffer.from(data, 'utf8');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
}

export async function handleRandom(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (typeof event.pathParameters?.tag === 'undefined') {
    return {
      statusCode: 400,
      body: 'bad request'
    };
  }

  const tag = event.pathParameters.tag;
  console.log('random tag', tag);

  const data = ''; // get data from random api
  const buffer = Buffer.from(data, 'utf8');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
}
