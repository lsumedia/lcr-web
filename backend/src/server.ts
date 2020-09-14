import { MongoClient, Db } from "mongodb";
import * as http from 'http';
import * as express from 'express';
import { SetupServer } from "includes/serverUtils";

export interface LCRServerProps {
    dbConnectString: string;
    database: string;
}

export class LCRServer {

    private mongoClient: MongoClient;
    private app: express.Express;
    private httpServer: http.Server;

    private db: Db;

    constructor(private props: LCRServerProps){

        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.mongoClient = new MongoClient(this.props.dbConnectString, {
            useUnifiedTopology: true,
        });

        //Set up server things
        SetupServer(this.app);
        
    }

    public connectDatabase = async () => {

        await this.mongoClient.connect();
        this.db = this.mongoClient.db(this.props.database);
    
    }

    public startServer = (port: number) => {

        this.httpServer.listen(port, function () {
            console.log('server: listening on port ' + port);
        });
    }
    
}