import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/EducationalBackground';
import { createEducationalBackgroundSchema } from '@/server/schemas/educationalBackgroundSchema';
import educationalBackgroundModel from '@/server/models/educationalBackgroundModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const educationalBackgroundData: CreateType = req.body;

      const eduBg = await educationalBackgroundModel.findOne({
        userId: educationalBackgroundData.userId,
      });

      if (eduBg) {
        throw new CustomError(
          'Bad Request',
          'User has already educational infos',
          400
        );
      }

      await educationalBackgroundModel.create({
        ...educationalBackgroundData,
      });

      return res.status(201).json({
        message: 'Educational Background successfully created',
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
  checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO),
  createEducationalBackgroundSchema
);
