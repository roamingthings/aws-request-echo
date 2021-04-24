import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export const loadEnvironment = () => {
    const envFile = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envFile)) {
        const result = dotenv.config()

        if (result.error) {
            throw result.error
        }
    } else {
        console.log('Skipping env file')
    }
}
