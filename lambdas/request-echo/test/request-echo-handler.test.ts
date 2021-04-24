import {handler} from '../lib';
import {APIGatewayProxyEvent} from "aws-lambda";

describe('RequestEchoHandler', () => {
    it('should return a body', async () => {
        const event = ({
            "resource": "/echo",
            "path": "/echo",
            "httpMethod": "GET",
        } as Partial<APIGatewayProxyEvent>) as APIGatewayProxyEvent;

        const response = await handler(event, null);

        expect(response).not.toBeNull();
    });
});
