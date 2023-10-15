import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import { get, omit } from 'lodash';

import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import AdminDAO from '@/server/data/AdminDAO';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const admin = await AdminDAO.findById(get(req.user, '_id') as string);

      return res.status(200).json({
        admin: omit(admin, 'password'),
      });
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
  } else {
    return res.status(403).json({ message: 'You have not a permission' });
  }
}

export default checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO);
