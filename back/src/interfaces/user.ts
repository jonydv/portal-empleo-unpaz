import { Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    state: boolean;
    google: boolean;

    compararPassword(password: string): boolean;
}