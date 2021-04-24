import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { tags } from './common/config';
import { RequestEchoServiceStack } from './stacks/request-echo-service';

/**
 * Define different Application Stages if needed
 */

export class ProdStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new RequestEchoServiceStack(this, 'request-echo-service', {
      tags,
      description: 'prod-Stage of Request Echo Service',
    });
  }
}
