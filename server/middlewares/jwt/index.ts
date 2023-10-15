import { get } from 'lodash';
import UserDAO from '@/server/data/UserDAO';
import { verifyJwt } from '@/server/lib/jwt';
import { NextApiHandler, NextApiResponse } from 'next';
import CustomError from '@/server/errors/CustomError';
import { NextApiRequestWithUser } from '@/types/next';
import { ISignJwt } from '@/types/Jwt';
import AdminDAO from '@/server/data/AdminDAO';

const checkUserExist = async <T extends typeof UserDAO | typeof AdminDAO>(
  userId: string | undefined,
  dao: T
): Promise<boolean> => {
  try {
    const where = { _id: userId };
    const data = await dao.exist(where);
    if (data) return true;
    return false;
  } catch (err: any) {
    // TODO: log
    throw new CustomError(err.name, err.message, err.status);
  }
};

export const checkJwtAndUserExist = <
  T extends typeof UserDAO | typeof AdminDAO
>(
  handler: NextApiHandler,
  dao: T
) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const accessToken = get(req, 'headers.authorization', '').replace(
        /^Bearer\s/,
        ''
      );
      if (accessToken) {
        const { decoded, expired } = verifyJwt(
          accessToken,
          'ACCESS_TOKEN_PRIVATE_KEY'
        );

        if (expired)
          throw new CustomError('Bad Request', 'JWT Token Expired', 400);

        const userId = get(decoded, '_id');
        if (userId) {
          const user = await checkUserExist<T>(userId, dao);
          if (user) {
            req.user = decoded as ISignJwt;
            return handler(req, res);
          } else throw new CustomError('Not Found', 'User Not Found', 404);
        } else throw new CustomError('Not Found', 'User Not Found', 404);
      } else throw new CustomError('Bad Request', 'JWT Token Not Found', 400);
    } catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({
          error: {
            name: err.name,
            message: err.message,
          },
        });
      }

      return res.status(500).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    }
  };
};
