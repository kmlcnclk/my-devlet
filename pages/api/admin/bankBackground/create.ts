import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/BankBackground';
import { createBankBackgroundSchema } from '@/server/schemas/bankBackgroundSchema';
import bankBackgroundModel from '@/server/models/bankBackgroundModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const bankBackgroundData: CreateType = req.body;

      const bankBg = await bankBackgroundModel.findOne({
        userId: bankBackgroundData.userId,
      });

      if (bankBg) {
        throw new CustomError(
          'Bad Request',
          'User has already bank infos',
          400
        );
      }

      await bankBackgroundModel.create({
        ...bankBackgroundData,
      });

      return res.status(201).json({
        message: 'Bank Background successfully created',
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
    checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO),
    createBankBackgroundSchema
  )
);
