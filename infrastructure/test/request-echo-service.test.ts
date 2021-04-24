import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {RequestEchoServiceStack} from '../lib/stacks/request-echo-service';
import {Accounts} from "../lib/common/config";

test('Grundbuchshop Link Generator', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RequestEchoServiceStack(app, 'MyTestStack', {env: Accounts.prod});
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
});
