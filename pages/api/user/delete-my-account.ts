import { NextApiResponse } from 'next';
import { get } from 'lodash';
import UserModel from '@/server/models/userModel';
import UserDAO from '@/server/data/UserDAO';
import { NextApiRequestWithUser } from '../../../types/next';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      await UserModel.findByIdAndDelete(get(req.user, '_id') as string);

      return res.status(200).json({
        message: 'Your account successfully deleted.',
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
