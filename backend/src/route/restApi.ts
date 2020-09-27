import * as express from 'express';

import { Db } from "mongodb";
import { RepositoryStore } from "repository/repositoryStore";

export interface RestAPIProps {
    repositoryStore: RepositoryStore
}

export class LCRRestAPI {

    private router: express.Router = express.Router();

    constructor(private props: RestAPIProps){

        this.addRoutes();

    }

    private addRoutes = () => {

        

    }

    public getRouter = () => {
        return this.router;
    }

}