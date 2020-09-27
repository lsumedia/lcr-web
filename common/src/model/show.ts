import { Document } from "mongoose";

export interface IShow{
    title: string;
    description: string;
    tags: string;
    image: string;
    slug: string;
    active: boolean;
}

export interface IShowLive extends IShow {
    disableSongDisplay?: boolean;
}