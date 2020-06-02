import { Document } from 'mongoose';

export enum EpisodeTypes {
    Episde = "episode",
    Podcast = "podcast",
    Mix = "mix",
    Update = "update",
}

export interface IEpisode extends Document{
    _id: string;
    metafile: string;
    meta: any;  //change to the meta definition
    title: string;
    type: EpisodeTypes;
    description: string;
    showSlug: string;
    tags: string;
    image: string;
    public: string;
    publishTime: Date;
}