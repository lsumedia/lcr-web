import * as express from 'express';

import { Db } from "mongodb";

export interface RestAPIProps {
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