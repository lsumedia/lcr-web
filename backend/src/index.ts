
import { LCRServer } from './server2';
import { LCRBackendEnvironment } from 'includes/environment';

const env = process.env as LCRBackendEnvironment;

const { MONGO_HOST, MONGO_PASSWORD, MONGO_USER, MONGO_DATABASE, PORT } = env;

const dbConnectString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`;

const server = new LCRServer({
    dbConnectString,
    database: MONGO_DATABASE
});

server.connectDatabase();

const port = parseInt(PORT) || 80;
server.startServer(port);
