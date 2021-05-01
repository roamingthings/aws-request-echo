import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { RequestEchoServiceStack } from '../lib/stacks/request-echo-service';
import { Accounts } from "../lib/common/config";

describe('Infrastructure', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('Request Echo Service Stack is valid', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new RequestEchoServiceStack(app, 'MyTestStack', {
            env: {
                account: 'testaccount',
                region: 'eu-central-1',
            }
        });
        // THEN
        expect.addSnapshotSerializer({
            test: val => typeof val === 'string',
            print: val => {
                const sanitizedVal = (val as string).replace(
                    /AssetParameters([A-Fa-f0-9]{64})(\w+)/,
                    'AssetParameters[HASH REMOVED]'
                )
                .replace(
                    /(\w+) (\w+) for asset\s?(version)?\s?"([A-Fa-f0-9]{64})"/,
                    '$1 $2 for asset $3 [HASH REMOVED]'
                );
                return `"${sanitizedVal}"`;
            },
        });
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
    });
});
