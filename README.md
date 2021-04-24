
# Request Echo

Echo the request (context) received by an AWS Lambda Function behind an API Gateway.


## Installation

To build an deploy this application, you need a current version of the [AWS CDK](https://aws.amazon.com/cdk/) to be installed.

In the `infrastructure` folder:
* Make a copy of `.env.sample` named `.env`
* Edit `.env` to meet your account

## Deployment

To deploy this project cd into `infrastructure` and run

```bash
  npx cdk deploy
```

## Update test snapshot

```bash
  npm run test -- -u
```
