import { Request } from "express";

import { UserInterface } from './user';

export interface ExtendedRequest extends Request {
    uid?: string;
    user?: UserInterface;

}

