import { handleTrending, handleSearch, handleTranslate, handleRandom } from '../src/index';

import { APIGatewayProxyEvent } from 'aws-lambda';

function buildEvent(): APIGatewayProxyEvent {
  return {
    body: null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'GET',
    isBase64Encoded: false,
    path: '',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: '',
      apiId: '',
      authorizer: undefined,
      protocol: '',
      httpMethod: '',
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        clientCert: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: '',
        user: null,
        userAgent: null,
        userArn: null
      },
      path: '',
      stage: '',
      requestId: '',
      requestTimeEpoch: 0,
      resourceId: '',
      resourcePath: ''
    },
    resource: ''
  };
}

describe('handleTrending', () => {
  const event = buildEvent();

  it('returns 200', async () => {
    const result = await handleTrending(event);
    expect(result.statusCode).toEqual(200);
  });
});

describe('handleSearch', () => {
  const event = buildEvent();

  it('returns 200', async () => {
    const result = await handleSearch(event);
    expect(result.statusCode).toEqual(200);
  });
});

describe('handleTranslate', () => {
  const event = buildEvent();

  it('returns 200', async () => {
    const result = await handleTranslate(event);
    expect(result.statusCode).toEqual(200);
  });
});

describe('handleRandom', () => {
  const event = buildEvent();

  it('returns 200', async () => {
    const result = await handleRandom(event);
    expect(result.statusCode).toEqual(200);
  });
});
