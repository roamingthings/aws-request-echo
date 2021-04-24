import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as actions from '@aws-cdk/aws-codepipeline-actions';
import { GitHubTrigger } from '@aws-cdk/aws-codepipeline-actions';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import * as cdk from '@aws-cdk/core';
import { ProdStage } from './stages';
import { LinuxBuildImage, BuildEnvironmentVariableType } from '@aws-cdk/aws-codebuild';
import { Accounts, repo, gitHubTokenSecretName } from "./common/config";

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const synthAction = SimpleSynthAction.standardNpmSynth({
      subdirectory: 'infrastructure',
      sourceArtifact,
      cloudAssemblyArtifact,
      environment: {
        buildImage: LinuxBuildImage.STANDARD_4_0,
        privileged: true, // true if using Docker
      },
      environmentVariables: {
        ACCOUNT_ID: {
          type: BuildEnvironmentVariableType.PLAINTEXT,
          value: Accounts.prod.account,
        },
        REGION: {
          type: BuildEnvironmentVariableType.PLAINTEXT,
          value: Accounts.prod.region,
        },
        OWNER_EMAIL: {
          type: BuildEnvironmentVariableType.PLAINTEXT,
          value: process.env.OWNER_EMAIL,
        },
        GITHUB_TOKEN_SECRET_NAME: {
          type: BuildEnvironmentVariableType.PLAINTEXT,
          value: process.env.GITHUB_TOKEN_SECRET_NAME,
        }
      },
    });

    const pipeline = new CdkPipeline(this, 'service-pipeline', {
      pipelineName: `echo-request-service-pipeline`,
      cloudAssemblyArtifact,
      selfMutating: true,

      sourceAction: new actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: cdk.SecretValue.secretsManager(gitHubTokenSecretName, {
          jsonField: 'token'
        }),
        // trigger: GitHubTrigger.POLL,
        ...repo,
      }),

      synthAction,
    });

    /**
     * Deploy different stages in different (or the same) Account(s)
     */
    pipeline.addApplicationStage(new ProdStage(this, 'prod', { env: Accounts.prod }));
    //pipeline.addApplicationStage(new DevStage(this, `${prefix}-prod`, { env: Accounts.dev }));
  }
}
