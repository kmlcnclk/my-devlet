import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import { get, omit } from 'lodash';

import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await UserDAO.findById(get(req.user, '_id') as string);

      return res.status(200).json({
        user: omit(omit(user, 'password'), 'privateKey'),
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

export default openMongooseConnection(
  checkJwtAndUserExist<typeof UserDAO>(handler, UserDAO)
);
