import { NextApiResponse, NextApiRequest } from 'next';
import JwtService from '@/server/services/JwtService';
import validateResource from '@/server/middlewares/validateResource';
import { generateJwtTokenSchema } from '@/server/schemas/jwtTokenSchema';
import { get } from 'lodash';
import { UserDocument } from '@/server/models/userModel';
import UserService from '@/server/services/UserService';
import UserDAO from '@/server/data/UserDAO';
import MongoDB from '@/server/lib/Mongoose';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import { corsForDigitalCampus } from '@/server/middlewares/cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const validated = await JwtService.isValidatePassword<
        UserDocument,
        typeof UserService
      >(req.body, UserService);

      await JwtService.updateJwtValidWithFalseOnDb(get(validated, '_id'));

      const user = await UserDAO.findById(get(validated, '_id'));
      const generatedTokensData =
        await JwtService.generateWithIdAndSaveDbJwtToken<UserDocument>(
          validated
        );

      return res.status(200).json({
        ...generatedTokensData,
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

export default corsForDigitalCampus(
  openMongooseConnection(validateResource(handler, generateJwtTokenSchema))
);
