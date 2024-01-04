import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { CreateType } from '@/types/TaxDebt';
import { createTaxDebtSchema } from '@/server/schemas/taxDebtSchema';
import taxDebtModel from '@/server/models/taxDebtModel';
import AdminDAO from '@/server/data/AdminDAO';
import CustomError from '@/server/errors/CustomError';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const taxDebtData: CreateType = req.body;

      const taxDebt = await taxDebtModel.findOne({
        userId: taxDebtData.userId,
      });

      if (taxDebt) {
        throw new CustomError(
          'Bad Request',
          'User has already tax debt infos',
          400
        );
      }

      await taxDebtModel.create({
        ...taxDebtData,
      });

      return res.status(201).json({
        message: 'Tax Debt successfully created',
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
    createTaxDebtSchema
  )
);
