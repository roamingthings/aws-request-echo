import * as dotenv from "dotenv";

export const loadEnvironment = () => {
    const result = dotenv.config()

    if (result.error) {
        throw result.error
    }
}
