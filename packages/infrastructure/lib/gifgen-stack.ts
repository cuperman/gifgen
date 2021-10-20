import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

const HANDLER_CODE_PATH = path.dirname(require.resolve('@cuperman/gifgen-apihandler/package.json'));

export class GifGenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = new apigw.RestApi(this, 'RestApi', {
      binaryMediaTypes: ['*~1*']
    });

    const handlerRuntime = lambda.Runtime.NODEJS_14_X;
    const handlerCode = lambda.Code.fromAsset(HANDLER_CODE_PATH);

    // trending

    const handleTrending = new lambda.Function(this, 'HandleTrending', {
      runtime: handlerRuntime,
      code: handlerCode,
      handler: 'dist/src/index.handleTrending'
    });

    restApi.root.addResource('trending').addMethod('GET', new apigw.LambdaIntegration(handleTrending));

    // search

    const handleSearch = new lambda.Function(this, 'HandleSearch', {
      runtime: handlerRuntime,
      code: handlerCode,
      handler: 'dist/src/index.handleSearch'
    });

    restApi.root
      .addResource('search')
      .addResource('{term}')
      .addMethod('GET', new apigw.LambdaIntegration(handleSearch));

    // translate

    const handleTranslate = new lambda.Function(this, 'HandleTranslate', {
      runtime: handlerRuntime,
      code: handlerCode,
      handler: 'dist/src/index.handleTranslate'
    });

    restApi.root
      .addResource('translate')
      .addResource('{term}')
      .addMethod('GET', new apigw.LambdaIntegration(handleTranslate));

    // random

    const handleRandom = new lambda.Function(this, 'HandleRandom', {
      runtime: handlerRuntime,
      code: handlerCode,
      handler: 'dist/src/index.handleRandom'
    });

    restApi.root.addResource('random').addResource('{tag}').addMethod('GET', new apigw.LambdaIntegration(handleRandom));
  }
}
