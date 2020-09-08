
import { IEpisode } from '@common/model/episode';
import { Collection, Db } from 'mongodb';

const EpisodeCollectionName = 'episode';

export class EpisodeRepository {

    public collection: Collection<IEpisode>;

    constructor(private db: Db){

        this.collection = db.collection<IEpisode>(EpisodeCollectionName);

    }

}