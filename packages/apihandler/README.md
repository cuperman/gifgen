# GifGen API Handler

## Development

Use the dev server to run the lambda locally

```bash
yarn start
```

## Testing with Nock

All endpoint tests have been stubbed so no http requests are actually made. All request interception was done with the nock library using [nock back](https://github.com/nock/nock#nock-back).

However, tests can be run to make actual http requests if the pre-recorded requests are deleted, then the new results are then stored locally.

First, copy the .env-test-template and add your credentials to access remote resources:

```bash
cp .env-test-template .env-test
vi .env-test
```

Then you can delete the tapes and rerun the tests:

```bash
rm -rf test/__tapes__/*
yarn test
```

This can be useful to test if the response structure has been altered in an api.
