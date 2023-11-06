import { NextApiResponse } from 'next';
import { get } from 'lodash';
import { NextApiRequestWithUser } from '../../../types/next';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import { v4 as uuidv4 } from 'uuid';
import UserModel, { UserDocument } from '@/server/models/userModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user: UserDocument = (await UserModel.findById(
        get(req.query, 'id') as string
      )) as UserDocument;

      if (!user)
        throw new CustomError(
          'Bad Request',
          'There is no user with this id',
          400
        );

      if (user.uniqueID)
        throw new CustomError(
          'Bad Request',
          'User has already digital id',
          400
        );

      user.uniqueID = await uuidv4();

      await user.save();

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
