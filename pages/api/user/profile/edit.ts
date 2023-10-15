import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import { get } from 'lodash';

import validateResource from '@/server/middlewares/validateResource';
import { editUserSchema } from '@/server/schemas/userSchema';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';
import CustomError from '@/server/errors/CustomError';
import { isUserEmailExists } from '@/server/middlewares/User';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      let data: any = {};

      if (get(req.body, 'name')) {
        data['name'] = get(req.body, 'name');
      }

      if (get(req.body, 'email')) {
        data['email'] = get(req.body, 'email');
      }

      if (!data['name'] && !data['email'])
        throw new CustomError(
          'Bad Request',
          'You did not change anything',
          400
        );

      data['isUserDataAddedToBlockchain'] = false;

      await UserDAO.findByIdAndUpdate(get(req.user, '_id') as string, data);

      return res.status(200).json({
        username: get(req.body, 'name'),
        email: get(req.body, 'email'),
        message: 'User successfully updated',
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
  validateResource(
    checkJwtAndUserExist<typeof UserDAO>(isUserEmailExists(handler), UserDAO),
    editUserSchema
  )
);
