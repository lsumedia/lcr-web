import { Document } from 'mongoose';

export interface IShow extends Document{
    title: string;
    description: string;
    tags: string;
    image: string;
    slug: string;
    active: boolean;
}