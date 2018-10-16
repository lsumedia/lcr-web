import { IEpisodeMetafile } from './metafile';

export enum EpisodeTypes{
    "episode",
    "podcast",
    "mix",
    "update"
}

export interface IEpisode{

    _id : string,
    metafile : string,
    meta : IEpisodeMetafile,
    title : string,
    type : string[EpisodeTypes],
    description: string,
    showSlug: string,
    tags: string,
    image: string,
    public : boolean,
    publishTime : string
}