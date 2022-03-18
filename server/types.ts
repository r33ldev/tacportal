import { Request, Response } from 'express';

export type AllContext = {
    req: Request & {session: any};
    res: Response
}