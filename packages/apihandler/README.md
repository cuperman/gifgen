# GifGen API Handler

## Development

Use the dev server to run the lambda locally

```bash
yarn start
```

## Giphy Service

### Testing with Nock

All endpoint tests have been stubbed so no http requests are actually made. All request interception was done with the nock library using [nock back](https://github.com/nock/nock#nock-back).

However, tests can be run to make actual http requests if the pre-recorded requests are deleted, then the new resultsare then stored locally. To do so run:

```
rm -rf test/__tapes__/*
GIPHY_API_KEY=myApiKey yarn test
```

This can be useful to test if the response structure has been altered in the giphy api.
