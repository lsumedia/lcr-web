import { Document } from 'mongoose';

interface IToken extends Document{
    _id: string;
    token: string;
}