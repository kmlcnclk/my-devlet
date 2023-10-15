import { NextApiRequestWithUser } from '@/types/next';
import { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';
import MongoDB from '@/server/lib/Mongoose';

export const openMongooseConnection = (handler: NextApiHandler) => {
  return async (
    req: NextApiRequest | NextApiRequestWithUser,
    res: NextApiResponse
  ) => {
    try {
      await MongoDB.connect();

      return handler(req, res);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
};
