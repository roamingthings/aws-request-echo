#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { tags, Accounts } from '../lib/common/config';
import { RequestEchoServiceStack } from '../lib/stacks/request-echo-service';
import { loadEnvironment } from "../lib/common/environment";

loadEnvironment();

const app = new cdk.App();
new RequestEchoServiceStack(app, `request-echo-service-stack`, {
  tags: {
    ...tags,
  },
  env: Accounts.prod,
});
