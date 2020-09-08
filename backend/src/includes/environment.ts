
export interface LCRBackendEnvironment extends NodeJS.ProcessEnv {

    PORT: string;

    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_HOST: string;
    MONGO_DATABASE: string;

    ICECAST_URL: string;
    GENIUS_API_SECRET: string;

    JWT_SECRET: string;

}