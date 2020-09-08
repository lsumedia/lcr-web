import { MongoClient } from "mongodb";
import * as http from 'http';
import * as express from 'express';

export class LCRServer {

    private mongoConnect: MongoClient;
    private httpServer: express.Express;


}