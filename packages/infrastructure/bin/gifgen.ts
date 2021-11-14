#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GifGenStack } from '../lib/gifgen-stack';
import { LogLevel } from '../lib/logging';

const app = new cdk.App();

// observability flag enables metrics, tracing, and info logging
const observe = [true, 'true'].includes(app.node.tryGetContext('observe'));

new GifGenStack(app, 'GifGen', {
  enableMetrics: !!observe,
  enableTracing: !!observe,
  logLevel: !!observe ? LogLevel.INFO : undefined
});
