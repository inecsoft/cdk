#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { inecsoft } from '../lib/hello-cdk-stack';

const app = new cdk.App();
new inecsoft(app, 'cdk-sns-sqs');
