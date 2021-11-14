# GifGen

Gif generator service

## Configuration

Create a `cdk.context.json` file with your configuration:

```json
{
  "stackName": "GifGen",
  "description": "Generate random gifs with an image URL",
  "env": {
    "account": "123456789012",
    "region": "us-east-1"
  },
  "tags": {
    "Application": "GifGen",
    "Environment": "Production",
    "Service": "Rest API"
  },
  "customDomain": {
    "zoneName": "mydomain.com",
    "domainName": "gif.mydomain.com"
  },
  "observability": {
    "enableMetrics": true,
    "enableTracing": true,
    "logLevel": "INFO"
  }
}
```

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

Or use your custom domain if specified.

Use this to create gif URLs, like:

`https://ab01c2def3.execute-api.us-east-1.amazonaws.com/prod/random/success.gif`

Supported endpoints:

* `/random/{tag}.gif`
* `/search/{term}.gif`
* `/translate/{term}.gif`
* `/trending.gif`

## Develop

Commands to install, build, and test

```bash
nvm use
yarn
yarn lerna bootstrap
yarn lerna run test
```

You can also run CDK commands from the root

```bash
yarn cdk list
yarn cdk synth
yarn cdk diff
yarn cdk deploy
yarn cdk destroy
```

Use lerna publish to release

```bash
yarn lerna publish [bump]
```