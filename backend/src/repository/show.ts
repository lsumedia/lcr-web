
import { IShow } from '@common/model/show';
import { Collection, Db } from 'mongodb';

const ShowCollectionName = 'show';

export class ShowRepository {

    public collection: Collection<IShow>;

    constructor(private db: Db){

        this.collection = db.collection<IShow>(ShowCollectionName);

    }

}