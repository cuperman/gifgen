import * as aws from 'aws-lambda';

export async function handleTrending(event: aws.APIGatewayProxyEvent): Promise<aws.APIGatewayProxyResult> {
  console.log('event', JSON.stringify(event, null, 2));

  const data = '';

  return {
    statusCode: 200,
    headers: {
      'Accept-Ranges': '',
      'Content-Type': 'image/gif',
      'Content-Length': '',
      ETag: '',
      'Last-Modified': ''
    },
    body: data.toString()
    // body: data.toString('base64'),
    // isBase64Encoded: true
  };
}

export async function handleSearch(event: aws.APIGatewayProxyEvent): Promise<aws.APIGatewayProxyResult> {
  console.log('event', JSON.stringify(event, null, 2));

  const data = '';

  return {
    statusCode: 200,
    headers: {
      'Accept-Ranges': '',
      'Content-Type': 'image/gif',
      'Content-Length': '',
      ETag: '',
      'Last-Modified': ''
    },
    body: data.toString()
    // body: data.toString('base64'),
    // isBase64Encoded: true
  };
}

export async function handleTranslate(event: aws.APIGatewayProxyEvent): Promise<aws.APIGatewayProxyResult> {
  console.log('event', JSON.stringify(event, null, 2));

  const data = '';

  return {
    statusCode: 200,
    headers: {
      'Accept-Ranges': '',
      'Content-Type': 'image/gif',
      'Content-Length': '',
      ETag: '',
      'Last-Modified': ''
    },
    body: data.toString()
    // body: data.toString('base64'),
    // isBase64Encoded: true
  };
}

export async function handleRandom(event: aws.APIGatewayProxyEvent): Promise<aws.APIGatewayProxyResult> {
  console.log('event', JSON.stringify(event, null, 2));

  const data = '';

  return {
    statusCode: 200,
    headers: {
      'Accept-Ranges': '',
      'Content-Type': 'image/gif',
      'Content-Length': '',
      ETag: '',
      'Last-Modified': ''
    },
    body: data.toString()
    // body: data.toString('base64'),
    // isBase64Encoded: true
  };
}
