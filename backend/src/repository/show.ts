
import { IShow } from '@common/model/show';
import { BaseRepository } from './base';

export class ShowRepository extends BaseRepository<IShow> {

    COLLECTION_NAME = 'show';

}