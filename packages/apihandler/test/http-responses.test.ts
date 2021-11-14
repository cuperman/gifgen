import { badRequest, notFound, internalServerError } from '../src/http-responses';

describe('badRequest', () => {
  const response = badRequest();

  it('has status code 400', () => {
    expect(response).toHaveProperty('statusCode', 400);
  });

  it('has describes the status in the body', () => {
    expect(response).toHaveProperty('body', 'Bad request');
  });
});

describe('notFound', () => {
  const response = notFound();

  it('has status code 404', () => {
    expect(response).toHaveProperty('statusCode', 404);
  });

  it('has describes the status in the body', () => {
    expect(response).toHaveProperty('body', 'Not found');
  });
});

describe('internalServerError', () => {
  const response = internalServerError();

  it('has status code 500', () => {
    expect(response).toHaveProperty('statusCode', 500);
  });

  it('has describes the status in the body', () => {
    expect(response).toHaveProperty('body', 'Internal server error');
  });
});
