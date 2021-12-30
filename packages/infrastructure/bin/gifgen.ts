#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GifGenStack } from '../lib/gifgen-stack';

const app = new cdk.App();

new GifGenStack(app, 'GifGen', {
  stackName: app.node.tryGetContext('stackName'),
  description: app.node.tryGetContext('description'),
  env: app.node.tryGetContext('env'),
  tags: app.node.tryGetContext('tags'),
  customDomain: app.node.tryGetContext('customDomain'),
  observability: app.node.tryGetContext('observability')
});
