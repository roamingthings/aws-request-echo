import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as logs from '@aws-cdk/aws-logs';
import * as path from 'path';

export class RequestEchoServiceStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const defaultOptions: Partial<lambda.FunctionProps> = {
            logRetention: logs.RetentionDays.ONE_DAY,
        };

        const pathToEchoHandlerSource = path.resolve(__dirname, '../../../lambdas/request-echo');
        const echoHandler = new lambda.Function(this, 'requestEchoFunction', {
            functionName: 'requestEchoFunction',
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            tracing: lambda.Tracing.PASS_THROUGH,
            code: lambda.Code.fromAsset(pathToEchoHandlerSource, {
                bundling: {
                    image: cdk.DockerImage.fromBuild(pathToEchoHandlerSource),
                    command: ['/bin/bash', '-c', 'cp -r /dist/. /asset-output/'],
                },
            }),
            ...defaultOptions,
        });

        const api = new apigw.RestApi(this, 'Request Echo API', {
            restApiName: 'echo',
            defaultCorsPreflightOptions: {
                allowOrigins: apigw.Cors.ALL_ORIGINS,
                allowMethods: apigw.Cors.ALL_METHODS,
                allowCredentials: true,
            },
            deployOptions: {
                // This could be done on the API level. However in case there is a need to throttle individual methods
                methodOptions: {
                    '/*/*': {
                        throttlingBurstLimit: 1,
                        throttlingRateLimit: 1
                    }
                }
            }
        });

        const linkGeneratorEndpoint = api.root.addResource('echo', {});
        linkGeneratorEndpoint.addMethod('ANY', new apigw.LambdaIntegration(echoHandler), {});
    }
}
