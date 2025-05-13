import type { RequestHandler } from 'express';
import { Session, verifyJwt } from '~/jwt';

declare global {
  namespace Express {
    export interface Request {
      session?: Session | null;
    }
  }
}

export const SessionMiddlewareFn: RequestHandler = async (req, res, next) => {
  const token: string | undefined = req.cookies?.['__session__'];
  if (!token) {
    next();
    return;
  }
  const session = await verifyJwt(token);
  req.session = session;
  next();
};
