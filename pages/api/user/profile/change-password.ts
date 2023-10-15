import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import { get } from 'lodash';

import validateResource from '@/server/middlewares/validateResource';
import UserService from '@/server/services/UserService';
import { changePasswordSchema } from '@/server/schemas/userSchema';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';
import MongoDB from '@/server/lib/Mongoose';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      await MongoDB.connect();

      const validated = await UserService.validatePasswordWithID({
        userID: get(req.user, '_id') as string,
        password: get(req.body, 'oldPassword'),
      });

      const hashedPassword = await UserService.hashingPassword(
        get(req.body, 'newPassword')
      );

      await UserDAO.findByIdAndUpdate(get(validated, '_id'), {
        password: hashedPassword,
      });

      return res.status(200).json({
        message: 'Password successfully updated',
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

export default validateResource(
  checkJwtAndUserExist<typeof UserDAO>(handler, UserDAO),
  changePasswordSchema
);
