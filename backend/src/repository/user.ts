import { IUser } from '@common/model/user';
import { BaseRepository } from './base';

export class UserRepository extends BaseRepository<IUser> {

    COLLECTION_NAME = 'user';

    resetPassword = (userId: string, password: string) => {

    }

}