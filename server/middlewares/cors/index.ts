import { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';
import { NextApiRequestWithUser } from '@/types/next';
import NextCors from 'nextjs-cors';

export function corsForDigitalCampus(handler: NextApiHandler) {
  return async (
    req: NextApiRequest | NextApiRequestWithUser,
    res: NextApiResponse
  ) => {
    try {
      await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
      });

      return handler(req, res);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}
