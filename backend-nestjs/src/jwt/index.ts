import { sign, verify } from 'jsonwebtoken';
import { configuration } from 'src/env';

if (!configuration.JWT.SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export type Session = {
  identifier: string;
  verified: boolean;
  userId?: number;
};

const signJwt = (data: Session, options: { expiresIn?: number } = {}) => {
  const { expiresIn } = options;
  return sign(data, configuration.JWT.SECRET, {
    expiresIn: expiresIn || 90 * 24 * 60 * 60,
  });
};

const verifyJwt = (token: string): Promise<Session | null> => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve(null);
    }
    verify(token, configuration.JWT.SECRET, (_err, decoded) => {
      if (typeof decoded !== 'object') {
        return resolve(null);
      }
      resolve((decoded as Session) || null);
    });
  });
};

export { signJwt, verifyJwt };
