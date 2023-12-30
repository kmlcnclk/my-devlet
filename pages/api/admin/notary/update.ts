import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/Notary';
import { createNotarySchema } from '@/server/schemas/notarySchema';
import notaryModel from '@/server/models/notaryModel';
import AdminDAO from '@/server/data/AdminDAO';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const notaryData: CreateType = req.body;

      await notaryModel.findOneAndUpdate(
        {
          userId: notaryData.userId,
        },
        {
          notaryInfos: notaryData.notaryInfos,
          ipfsHash: '',
        }
      );

      return res.status(200).json({
        message: 'Notary successfully updated',
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
