import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import { get } from 'lodash';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { createSmartContractSchema } from '@/server/schemas/smartContractSchema';
import { CreateType } from '@/types/SmartContract';
import SmartContractDAO from '@/server/data/SmartContractDAO';
import SmartContractService from '@/server/services/SmartContractService';
import UserModel, { UserDocument } from '@/server/models/userModel';
import UserService from '@/server/services/UserService';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const smartContractData: CreateType = req.body;

      const user: UserDocument = (await UserModel.findById(
        get(req.user, '_id')
      )) as UserDocument;

      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey);

      const contractAddressOfUser =
        await SmartContractService.deployUserContract(
          user.address,
          decryptedPrivateKey,
          smartContractData.network
        );
     
      const smartContract = await SmartContractDAO.create({
        userId: get(req.user, '_id'),
        ...smartContractData,
        userWallet: user.address,
        contractAddressOfUser,
      });
    

      const sc = await smartContract.populate({
        path: 'userId',
        select: 'name',
      });

      return res.status(201).json({
        message: 'Smart Contract successfully created',
        smartContract: sc,
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
    checkJwtAndUserExist<typeof UserDAO>(handler, UserDAO),
    createSmartContractSchema
  )
);
