import { Collection, Db } from "mongodb";

export interface BaseRepositoryProps {
    db: Db
}

export abstract class BaseRepository<T> {

    readonly COLLECTION_NAME: string;
    public collection: Collection<T>;

    constructor(private props: BaseRepositoryProps){

        this.collection = this.props.db.collection(this.COLLECTION_NAME);

    }

}