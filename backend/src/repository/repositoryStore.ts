import { Db } from "mongodb";
import { BaseRepositoryProps } from './base';
import { EpisodeRepository } from "./episode";
import { ShowRepository } from "./show";
import { UserRepository } from "./user";

export class RepositoryStore {

    public episodes: EpisodeRepository;
    public shows: ShowRepository;
    public user: UserRepository;

    constructor(private props: BaseRepositoryProps){

        this.episodes = new EpisodeRepository(props);
        this.shows = new ShowRepository(props);
        this.user = new UserRepository(props);

    }

}
