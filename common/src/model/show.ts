import { Document } from 'mongoose';

export interface IShow extends Document{
    _id: string;
    title: string;
    description: string;
    tags: string;
    image: string;
    slug: string;
    active: boolean;
}