import { NextApiResponse, NextApiRequest } from 'next';

import { RegisterType } from '@/types/Admin';
import AdminDAO from '@/server/data/AdminDAO';
import JwtService from '@/server/services/JwtService';
import { IGeneratedJwtTokens } from '@/types/Jwt';
import { isAdminEmailExists } from '@/server/middlewares/Admin';
import JwtTokenDAO from '@/server/data/JwtTokenDAO';
import { omit } from 'lodash';
import validateResource from '@/server/middlewares/validateResource';
import { createAdminSchema } from '@/server/schemas/adminSchema';
import MongoDB from '@/server/lib/Mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await MongoDB.connect();

      const adminData: RegisterType = req.body;

      const admin = await AdminDAO.create(
        omit(adminData, 'passwordConfirmation')
      );

      const { accessToken, refreshToken }: IGeneratedJwtTokens =
        await JwtService.generateJwtToken(admin);

      await JwtTokenDAO.create(admin._id, accessToken, refreshToken);

      return res.status(201).json({
        accessToken,
        refreshToken,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(403).json({ message: 'You have not a permission' });
  }
}

export default validateResource(isAdminEmailExists(handler), createAdminSchema);
