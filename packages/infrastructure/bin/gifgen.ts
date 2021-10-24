#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GifGenStack, LogLevel } from '../lib/gifgen-stack';

const app = new cdk.App();

// observability flag enables metrics, tracing, and info logging
const observe = app.node.tryGetContext('observe') === 'true';

new GifGenStack(app, 'GifGen', {
  enableMetrics: !!observe,
  enableTracing: !!observe,
  logLevel: !!observe ? LogLevel.INFO : undefined
});
