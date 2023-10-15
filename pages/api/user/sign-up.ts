import { NextApiResponse, NextApiRequest } from 'next';

import { SignUpType } from '@/types/User';
import UserDAO from '@/server/data/UserDAO';
import JwtService from '@/server/services/JwtService';
import { IGeneratedJwtTokens } from '@/types/Jwt';
import { isUserEmailExists } from '@/server/middlewares/User';
import JwtTokenDAO from '@/server/data/JwtTokenDAO';
import { omit } from 'lodash';
import validateResource from '@/server/middlewares/validateResource';
import { createUserSchema } from '@/server/schemas/userSchema';
import { v4 as uuidv4 } from 'uuid';
// import UserService from '@/server/services/UserService';
// import { EthereumKeyPair } from '@/server/lib/EthereumKeyPair';
import MongoDB from '@/server/lib/Mongoose';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userData: SignUpType = req.body;

      // const keyPairNewKey = new EthereumKeyPair();

      // const privateKey = keyPairNewKey.getPrivateAddress();
      // const address = keyPairNewKey.getPublicAddress();

      // const hashOfPrivateKey = await UserService.hashUserWalletPrivateKey(
      //   privateKey
      // );

      const data = {
        ...omit(userData, 'passwordConfirmation'),
        uniqueID: uuidv4(),
        address: 'address',
        privateKey: 'hashOfPrivateKey',
      };

      const user = await UserDAO.create(data);

      const { accessToken, refreshToken }: IGeneratedJwtTokens =
        await JwtService.generateJwtToken(user);

      await JwtTokenDAO.create(user._id, accessToken, refreshToken);
      await MongoDB.close();

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

export default openMongooseConnection(
  validateResource(isUserEmailExists(handler), createUserSchema)
);
