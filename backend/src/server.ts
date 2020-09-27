import { MongoClient, Db } from "mongodb";
import * as http from 'http';
import * as express from 'express';
import { SetupServer } from "includes/serverUtils";
import { RepositoryStore } from "repository/repositoryStore";
import { LCRGraphQLApp } from "route/graphqlApp";
import { LCRRestAPI } from "route/restApi";

export interface LCRServerProps {
    dbConnectString: string;
    database: string;
}

export class LCRServer {

    private mongoClient: MongoClient;
    private app: express.Express;
    private httpServer: http.Server;

    private db: Db;

    private store: RepositoryStore;
    
    private graphqlAPI: LCRGraphQLApp;
    private restAPI: LCRRestAPI;

    constructor(private props: LCRServerProps){

        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.mongoClient = new MongoClient(this.props.dbConnectString, {
            useUnifiedTopology: true,
        });

        //Configure the Express server (this doesn't add the routings)
        SetupServer(this.app);
        
    }

    public connectDatabase = async () => {

        await this.mongoClient.connect();
        this.db = this.mongoClient.db(this.props.database);

        //Once repository store is enabled, we can start up other logic
        this.store = new RepositoryStore({
            db: this.db,
        });

        this.graphqlAPI = new LCRGraphQLApp({ repositoryStore: this.store });
        this.restAPI = new LCRRestAPI({ repositoryStore: this.store });

        

    
    }

    public startServer = (port: number) => {

        this.httpServer.listen(port, function () {
            console.log('server: listening on port ' + port);
        });
    }
    
}