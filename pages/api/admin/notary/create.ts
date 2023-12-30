import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/Notary';
import { createNotarySchema } from '@/server/schemas/notarySchema';
import notaryModel from '@/server/models/notaryModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const notaryData: CreateType = req.body;

      const notary = await notaryModel.findOne({
        userId: notaryData.userId,
      });

      if (notary) {
        throw new CustomError(
          'Bad Request',
          'User has already notary infos',
          400
        );
      }

      await notaryModel.create({
        ...notaryData,
      });

      return res.status(201).json({
        message: 'Notary successfully created',
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
    createNotarySchema
  )
);
