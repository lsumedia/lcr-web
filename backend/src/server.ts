import { MongoClient, Db } from "mongodb";
import * as http from 'http';
import * as express from 'express';
import * as mongoose from 'mongoose';

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

        this.graphqlAPI = new LCRGraphQLApp({ });
        this.restAPI = new LCRRestAPI({ });

        mongoose.connect(this.props.dbConnectString, {
            dbName: this.props.database,
        }).then(
            () => { 
                console.log("mongoose: Connected successfully to server")
            },
            err => { 
                console.log("mongoose: Error connecting to database"); 
                console.log(err)
                process.exit();
            }
        )
    
    }

    public startServer = (port: number) => {

        this.httpServer.listen(port, function () {
            console.log('server: listening on port ' + port);
        });
    }
    
}