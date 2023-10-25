import { NextApiResponse, NextApiRequest } from 'next';

import { RegisterType } from '@/types/Admin';
import JwtService from '@/server/services/JwtService';
import { IGeneratedJwtTokens } from '@/types/Jwt';
import { isAdminEmailExists } from '@/server/middlewares/Admin';
import JwtTokenDAO from '@/server/data/JwtTokenDAO';
import { omit } from 'lodash';
import validateResource from '@/server/middlewares/validateResource';
import { createAdminSchema } from '@/server/schemas/adminSchema';
import UserService from '@/server/services/UserService';
import { EthereumKeyPair } from '@/server/lib/EthereumKeyPair';
import { v4 as uuidv4 } from 'uuid';
import AdminModel from '@/server/models/adminModel';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const adminData: RegisterType = req.body;

      const keyPairNewKey = new EthereumKeyPair();

      const privateKey = keyPairNewKey.getPrivateAddress();
      const address = keyPairNewKey.getPublicAddress();

      const hashOfPrivateKey = await UserService.hashUserWalletPrivateKey(
        privateKey
      );

      const data = {
        ...omit(adminData, 'passwordConfirmation'),
        uniqueID: uuidv4(),
        address: address,
        privateKey: hashOfPrivateKey,
      };

      const admin = await AdminModel.create(data);

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
