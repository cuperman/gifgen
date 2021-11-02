import { APIGatewayProxyResult } from 'aws-lambda';

export enum StatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export function badRequest(): APIGatewayProxyResult {
  return {
    statusCode: StatusCode.BAD_REQUEST,
    body: 'bad request'
  };
}

export function notFound(): APIGatewayProxyResult {
  return {
    statusCode: StatusCode.NOT_FOUND,
    body: 'not found'
  };
}

export function internalServerError(): APIGatewayProxyResult {
  return {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    body: 'internal server error'
  };
}
