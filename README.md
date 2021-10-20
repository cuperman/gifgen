# GifGen

Gif generator service

## Deploy

Deploy the infrastructure to your AWS account with CDK

```bash
npx aws-cdk deploy --app "npx @cuperman/gifgen-infrastructure" GifGen
```

## Development

```bash
yarn
yarn lerna bootstrap
yarn lerna run test
yarn lerna publish [bump]
```
