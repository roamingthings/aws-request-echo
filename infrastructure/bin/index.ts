#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Accounts, tags } from '../lib/common/config';
import { PipelineStack } from "../lib/pipeline";

const app = new cdk.App();
new PipelineStack(app, 'request-echo-service-pipeline-stack', {
  tags: {
    ...tags,
  },
  env: Accounts.prod,
});
