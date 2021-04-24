import {RequestEchoServiceStack} from "../lib/stacks/request-echo-service";
import {Accounts, tags} from "../lib/common/config";
import {loadEnvironment} from "../lib/common/environment";
import * as cdk from "@aws-cdk/core";

loadEnvironment();

const app = new cdk.App();
new RequestEchoServiceStack(app, `request-echo-service-stack`, {
    description: 'Pipeline for Request Echo Service',
    tags: {
        ...tags,
    },
    env: Accounts.prod,
});
