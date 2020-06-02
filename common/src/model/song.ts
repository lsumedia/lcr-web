import { Document } from 'mongoose';

export interface ISong extends Document{
    _id: string;
    artist: string;
    title: string;
    album: string;
    commercial: boolean;
    length: number;
    timestamp: Date;
}