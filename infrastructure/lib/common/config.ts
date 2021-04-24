export const tags = {
  'owner:email': process.env.OWNER_EMAIL as string,
  'application-id': 'request-echo',
  repository: 'https://github.com/roamingthings/aws-request-echo',
};

export class Accounts {
  public static prod = { account: process.env.ACCOUNT_ID, region: process.env.REGION };
}
