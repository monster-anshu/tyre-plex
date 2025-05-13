import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/env';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export type Session = {
  identifier: string;
  verified: boolean;
};

const signJwt = (data: Session, options: { expiresIn?: number } = {}) => {
  const { expiresIn } = options;
  return sign(data, JWT_SECRET, {
    expiresIn: expiresIn || 90 * 24 * 60 * 60,
  });
};

const verifyJwt = (token: string): Promise<Session | null> => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve(null);
    }
    verify(token, JWT_SECRET, (_err, decoded) => {
      if (typeof decoded !== 'object') {
        return resolve(null);
      }
      resolve((decoded as Session) || null);
    });
  });
};

export { signJwt, verifyJwt };
