import { APIGatewayProxyResult } from 'aws-lambda';

export enum StatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export function badRequest(): APIGatewayProxyResult {
  return {
    statusCode: StatusCode.BAD_REQUEST,
    body: 'Bad request'
  };
}

export function notFound(): APIGatewayProxyResult {
  return {
    statusCode: StatusCode.NOT_FOUND,
    body: 'Not found'
  };
}

export function internalServerError(): APIGatewayProxyResult {
  return {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    body: 'Internal server error'
  };
}
