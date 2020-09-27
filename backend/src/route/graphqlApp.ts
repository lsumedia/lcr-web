import { Db } from "mongodb";
import { RepositoryStore } from "repository/repositoryStore";

export interface GraphQLAppProps {
    repositoryStore: RepositoryStore;
}

export class LCRGraphQLApp {

    constructor(private props: GraphQLAppProps) {


        // const resolvers = 


    }

}