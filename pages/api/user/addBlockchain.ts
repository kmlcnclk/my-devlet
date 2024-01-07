import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { get } from 'lodash';
import SmartContractModel, {
  SmartContractDocument,
} from '@/server/models/smartContractModel';
import UserModel, { UserDocument } from '@/server/models/userModel';
import UserService from '@/server/services/UserService';
import { AddBlockChainType } from '@/types/User';
import { addBlockChainSchema } from '@/server/schemas/userSchema';
import Web3Service from '@/server/services/Web3Service';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import CustomError from '@/server/errors/CustomError';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const addBlockchainData: AddBlockChainType = req.body;

      const user: UserDocument = (await UserModel.findById(
        get(req.user, '_id')
      )) as UserDocument;

      if (!user.uniqueID)
        throw new CustomError('Bad Request', 'You do not have digital id', 400);

      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey);

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const educationalBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[0],
        decryptedPrivateKey,
        user.address,
        '0'
      );

      const userData = await {
        email: user.email,
        name: user.name,
        age: user.age,
      };

      await educationalBackgroundService.setUserData(
        user.address,
        user.uniqueID,
        userData
      );

      user.isUserDataAddedToBlockchain = await true;

      await user.save();

      return res.status(200).json({
        message: 'User successfully added to blockchain',
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
    addBlockChainSchema
  )
);
