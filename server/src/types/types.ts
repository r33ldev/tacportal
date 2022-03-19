import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

export type AllContext = {
    req: Request & {
        session: Session & Partial<SessionData> & { studentId: any };
      };
    res: Response
}
