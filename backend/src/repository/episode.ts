
import { IEpisode } from '@common/model/episode';
import { BaseRepository } from './base';

export class EpisodeRepository extends BaseRepository<IEpisode> {

    COLLECTION_NAME = 'episode';

}