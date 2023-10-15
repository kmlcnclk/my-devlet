import UserDAO from '@/server/data/UserDAO';
import { SignUpType } from '@/types/User';
import { NextApiRequestWithUser } from '@/types/next';
import { get } from 'lodash';
import { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';

export const isUserEmailExists = (handler: NextApiHandler) => {
  return async (
    req: NextApiRequest | NextApiRequestWithUser,
    res: NextApiResponse
  ) => {
    try {
      const userData: SignUpType = req.body;

      const isUserEmailExist = await UserDAO.findOne({
        email: userData.email,
      });

      if (get(req, 'user') && isUserEmailExist?._id == get(req, 'user._id')) {
        return res.status(400).json({
          message: 'You already have this email',
        });
      }

      if (isUserEmailExist) {
        return res.status(400).json({
          message: 'Email is already exist',
        });
      }

      return handler(req, res);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
};
