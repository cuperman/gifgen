import { APIGatewayProxyResult } from 'aws-lambda';
import * as http from 'http';

import { handleRandom, handleSearch, handleTrending } from './src/index';
import { buildEvent } from './test/factories';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

function internalServerError(): APIGatewayProxyResult {
  return {
    statusCode: 500,
    body: 'internal server error'
  };
}

function notFound(): APIGatewayProxyResult {
  return {
    statusCode: 404,
    body: 'not found'
  };
}

async function getRandom(param: string) {
  const event = buildEvent({
    pathParameters: {
      tag: param
    }
  });
  return handleRandom(event);
}

async function getSearch(param: string) {
  const event = buildEvent({
    pathParameters: {
      term: param
    }
  });
  return handleSearch(event);
}

async function getTranslate(param: string) {
  const event = buildEvent({
    pathParameters: {
      term: param
    }
  });
  return handleRandom(event);
}

async function getTrending() {
  const event = buildEvent();
  return handleTrending(event);
}

async function route(req: http.IncomingMessage): Promise<APIGatewayProxyResult> {
  if (typeof req.url === 'undefined') {
    return internalServerError();
  }

  let match;
  if ((match = req.url.match(/random\/([\w%\.]+)/))) {
    return getRandom(match[1]);
  } else if ((match = req.url.match(/search\/([\w%\.]+)/))) {
    return getSearch(match[1]);
  } else if ((match = req.url.match(/translate\/([\w%\.]+)/))) {
    return getTranslate(match[1]);
  } else if (req.url.match(/trending\.gif/)) {
    return getTrending();
  }

  return notFound();
}

async function main(req: http.IncomingMessage, res: http.ServerResponse) {
  const result = await route(req);

  res.statusCode = result.statusCode;

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        res.setHeader(name, value);
      }
    });
  }

  const buffer = Buffer.from(result.body, result.isBase64Encoded ? 'base64' : 'utf8');
  res.write(buffer.toString('utf8'));

  res.end();
}

const server = http.createServer(main);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
