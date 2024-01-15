import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/FamilyTreeBackground';
import { createFamilyTreeBackgroundSchema } from '@/server/schemas/familyTreeBackgroundSchema';
import familyTreeBackgroundModel from '@/server/models/familyTreeModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const familyTreeBackgroundData: CreateType = req.body;

      const familyTreeBg = await familyTreeBackgroundModel.findOne({
        userId: familyTreeBackgroundData.userId,
      });

      if (familyTreeBg) {
        throw new CustomError(
          'Bad Request',
          'User has already Family Tree infos',
          400
        );
      }

      await familyTreeBackgroundModel.create({
        ...familyTreeBackgroundData,
      });

      return res.status(201).json({
        message: 'Family Tree Background successfully created',
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
    createFamilyTreeBackgroundSchema
  )
);
