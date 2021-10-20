# GifGen

Gif generator service

## Deploy

Deploy the infrastructure to your AWS account with CDK

```bash
npx aws-cdk deploy --app "npx @cuperman/gifgen-infrastructure" GifGen
```

## Use

When the deployment is complete, it will output the rest api endpoint, which can be used to generate gif files

```bash
 ✅  GifGen

Outputs:
GifGen.RestApiEndpoint1234567A = https://ab01c2def3.execute-api.us-east-1.amazonaws.com/prod/
```

Use this to create gif URLs, like:

https://ab01c2def3.execute-api.us-east-1.amazonaws.com/prod/random/success.gif

Supported endpoints:

* /random/:tag.gif
* /search/:term.gif
* /translate/:term.gif
* /trending.gif

## Develop

Useful commands

```bash
yarn
yarn lerna bootstrap
yarn lerna run test
yarn lerna publish [bump]
```
