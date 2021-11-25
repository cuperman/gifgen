import * as dotenv from 'dotenv';
dotenv.config();

import { APIGatewayProxyResult } from 'aws-lambda';
import * as http from 'http';

import { handleRandom, handleSearch, handleTranslate, handleTrending } from './src/index';
import { internalServerError, notFound } from './src/http-responses';
import { buildEvent } from './test/factories';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

async function getTrending(ts?: string) {
  const event = buildEvent({
    queryStringParameters: ts
      ? {
          ts
        }
      : null
  });
  return handleTrending(event);
}

async function getSearch(param: string, ts?: string) {
  const event = buildEvent({
    pathParameters: {
      image: param
    },
    queryStringParameters: ts
      ? {
          ts
        }
      : null
  });
  return handleSearch(event);
}

async function getTranslate(param: string, ts?: string) {
  const event = buildEvent({
    pathParameters: {
      image: param
    },
    queryStringParameters: ts
      ? {
          ts
        }
      : null
  });
  return handleTranslate(event);
}

async function getRandom(param: string, ts?: string) {
  const event = buildEvent({
    pathParameters: {
      image: param
    },
    queryStringParameters: ts
      ? {
          ts
        }
      : null
  });
  return handleRandom(event);
}

async function route(req: http.IncomingMessage): Promise<APIGatewayProxyResult> {
  if (typeof req.url === 'undefined') {
    return internalServerError();
  }

  const tsMatch = req.url.match(/\?ts=(\d+)/);
  const ts = tsMatch && tsMatch[1] ? tsMatch[1] : undefined;

  let match;
  if (req.url.match(/trending\.gif/)) {
    return getTrending(ts);
  } else if ((match = req.url.match(/search\/([\w%\.]+)/))) {
    return getSearch(match[1], ts);
  } else if ((match = req.url.match(/translate\/([\w%\.]+)/))) {
    return getTranslate(match[1], ts);
  } else if ((match = req.url.match(/random\/([\w%\.]+)/))) {
    return getRandom(match[1], ts);
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

  const buffer = Buffer.from(result.body, result.isBase64Encoded ? 'base64' : 'binary');
  res.write(buffer.toString('binary'), 'binary');

  res.end();
}

const server = http.createServer(main);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
