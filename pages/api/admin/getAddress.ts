import { NextApiResponse } from 'next';
import { get } from 'lodash';
import AdminDAO from '@/server/data/AdminDAO';
import { NextApiRequestWithUser } from '../../../types/next';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import { AdminDocument } from '@/server/models/adminModel';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user: AdminDocument = (await AdminDAO.findById(
        get(req.user, '_id') as string
      )) as AdminDocument;

      return res.status(200).json({
        address: user.address,
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
  checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO)
);
