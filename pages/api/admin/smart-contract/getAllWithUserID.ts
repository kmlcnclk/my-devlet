import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import { get } from 'lodash';

import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import SmartContractModel from '@/server/models/smartContractModel';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import AdminDAO from '@/server/data/AdminDAO';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const smartContracts = await SmartContractModel.find({
        userId: get(req.user, '_id'),
      });

      return res.status(201).json({
        message: 'Smart Contracts successfully returned',
        smartContracts,
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
  checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO)
);
