import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/AssetBackground';
import { createAssetBackgroundSchema } from '@/server/schemas/assetBackgroundSchema';
import assetBackgroundModel from '@/server/models/assetModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const assetBackgroundData: CreateType = req.body;

      const assetBg = await assetBackgroundModel.findOne({
        userId: assetBackgroundData.userId,
      });

      if (assetBg) {
        throw new CustomError(
          'Bad Request',
          'User has already asset infos',
          400
        );
      }

      await assetBackgroundModel.create({
        ...assetBackgroundData,
      });

      return res.status(201).json({
        message: 'Asset Background successfully created',
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
    createAssetBackgroundSchema
  )
);
