/*eslint import/no-extraneous-dependencies: ["error"]*/

import 'source-map-support/register';
import AWSXRay from 'aws-xray-sdk-core';
import http from 'http';
import https from 'https';

AWSXRay.captureHTTPsGlobal(http, false);
AWSXRay.captureHTTPsGlobal(https, false);

export { handler } from './request-echo-handler';
