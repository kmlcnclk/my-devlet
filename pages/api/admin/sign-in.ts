import { NextApiResponse, NextApiRequest } from 'next';
import JwtService from '@/server/services/JwtService';
import validateResource from '@/server/middlewares/validateResource';
import { generateJwtTokenSchema } from '@/server/schemas/jwtTokenSchema';
import { get } from 'lodash';
import { AdminDocument } from '@/server/models/adminModel';
import AdminService from '@/server/services/AdminService';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const validated = await JwtService.isValidatePassword<
        AdminDocument,
        typeof AdminService
      >(req.body, AdminService);

      await JwtService.updateJwtValidWithFalseOnDb(get(validated, '_id'));

      const generatedTokensData =
        await JwtService.generateWithIdAndSaveDbJwtToken<AdminDocument>(
          validated
        );

      return res.status(200).json(generatedTokensData);
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
  validateResource(handler, generateJwtTokenSchema)
);
