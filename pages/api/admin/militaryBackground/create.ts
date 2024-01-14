import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/MilitaryBackground';
import { createMilitaryBackgroundSchema } from '@/server/schemas/militaryBackgroundSchema';
import militaryBackgroundModel from '@/server/models/militaryModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const militaryBackgroundData: CreateType = req.body;

      const militaryBg = await militaryBackgroundModel.findOne({
        userId: militaryBackgroundData.userId,
      });

      if (militaryBg) {
        throw new CustomError(
          'Bad Request',
          'User has already military infos',
          400
        );
      }

      await militaryBackgroundModel.create({
        ...militaryBackgroundData,
      });

      return res.status(201).json({
        message: 'Military Background successfully created',
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
    createMilitaryBackgroundSchema
  )
);
