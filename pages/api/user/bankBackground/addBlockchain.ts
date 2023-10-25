import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/BankBackground';
import { addBlockChainSchema } from '@/server/schemas/bankBackgroundSchema';
import bankBackgroundModel, {
  BankBackgroundDocument,
} from '@/server/models/bankBackgroundModel';
import { get } from 'lodash';
import SmartContractModel, {
  SmartContractDocument,
} from '@/server/models/smartContractModel';
import UserModel, { UserDocument } from '@/server/models/userModel';
import UserService from '@/server/services/UserService';
import Web3Service from '@/server/services/Web3Service';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const addBlockchainData: AddBlockChainType = req.body;

      const user: UserDocument = (await UserModel.findById(
        get(req.user, '_id')
      )) as UserDocument;

      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey);

      const bankBackground: BankBackgroundDocument =
        (await bankBackgroundModel.findById(
          addBlockchainData.id
        )) as BankBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const bankBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser,
        decryptedPrivateKey,
        user.address
      );

      const bankNames = bankBackground.bankInfos.map((item) => item.bankName);
      const accountBalances = bankBackground.bankInfos.map((item) =>
        Number(item.accountBalance)
      );
      const accountNumbers = bankBackground.bankInfos.map(
        (item) => item.accountNumber
      );
      const accountTypes = bankBackground.bankInfos.map(
        (item) => item.accountType
      );
      const accountOpeningDates = bankBackground.bankInfos.map((item) =>
        new Date(item.accountOpeningDate).getTime()
      );

      await bankBackgroundService.setBankRecord(
        user.address,
        user.uniqueID,
        bankNames,
        accountBalances,
        accountNumbers,
        accountTypes,
        accountOpeningDates,
        addBlockchainData.ipfsHash
      );

      bankBackground.ipfsHash = await addBlockchainData.ipfsHash;
      await bankBackground.save();

      const newBankBackground: BankBackgroundDocument =
        (await bankBackgroundModel.findById(
          bankBackground._id
        )) as BankBackgroundDocument;

      return res.status(200).json({
        message: 'Bank Background successfully added to blockchain',
        eb: newBankBackground,
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
