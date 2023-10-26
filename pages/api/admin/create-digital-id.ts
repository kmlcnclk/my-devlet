import { NextApiResponse } from 'next';
import { get } from 'lodash';
import { NextApiRequestWithUser } from '../../../types/next';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import UserDAO from '@/server/data/UserDAO';
import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from '@/server/models/userModel';
import AdminDAO from '@/server/data/AdminDAO';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user: UserDocument = (await UserDAO.findByIdAndUpdate(
        get(req.user, '_id') as string,
        {
          uniqueID: uuidv4(),
        }
      )) as UserDocument;

      return res.status(201).json({
        message: 'Digital Id is successfully created for this user',
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
