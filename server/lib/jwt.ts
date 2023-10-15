import jwt from 'jsonwebtoken';
import { ISignJwt } from '@/types/Jwt';

export function signJwt(
  object: ISignJwt,
  keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
  options?: jwt.SignOptions | undefined
) {
  const signingKey = process.env[keyName];

  const data = jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
  return data;
}

export function verifyJwt(
  token: string,
  keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY'
) {
  const publicKey = process.env[keyName];

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null,
    };
  }
}
