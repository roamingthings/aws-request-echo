import {loadEnvironment} from "./environment";

loadEnvironment();

export const repo = {
  owner: 'roamingthings',
  repo: 'aws-request-echo',
  branch: 'main',
};

export const tags = {
  'owner:email': process.env.OWNER_EMAIL as string,
  'application-id': 'request-echo',
  repository: 'https://github.com/roamingthings/aws-request-echo',
};

export class Accounts {
  public static prod = { account: process.env.ACCOUNT_ID, region: process.env.REGION };
}

export const gitHubTokenSecretName = process.env.GITHUB_TOKEN_SECRET_NAME as string;
