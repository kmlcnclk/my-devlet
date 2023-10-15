import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/EducationalBackground';
import { createEducationalBackgroundSchema } from '@/server/schemas/educationalBackgroundSchema';
import educationalBackgroundModel from '@/server/models/educationalBackgroundModel';
import AdminDAO from '@/server/data/AdminDAO';
import MongoDB from '@/server/lib/Mongoose';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      await MongoDB.connect();

      const educationalBackgroundData: CreateType = req.body;

      await educationalBackgroundModel.findOneAndUpdate(
        {
          userId: educationalBackgroundData.userId,
        },
        {
          schoolInfos: educationalBackgroundData.schoolInfos,
          ipfsHash: '',
        }
      );

      return res.status(200).json({
        message: 'Educational Background successfully updated',
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
