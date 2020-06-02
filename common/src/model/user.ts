import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    email: string;
    name: string;
    bio: string;
    image: string;
    hash: string;
    salt: string;
}