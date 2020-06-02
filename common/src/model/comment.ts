import { Document } from 'mongoose';

export interface IComment extends Document {
    comment: string;
    authorName: string;
    postedTime: string;
    read: boolean;
}