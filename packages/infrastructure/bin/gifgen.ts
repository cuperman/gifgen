#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GifGenStack } from '../lib/gifgen-stack';

const app = new cdk.App();

new GifGenStack(app, 'GitGen');
