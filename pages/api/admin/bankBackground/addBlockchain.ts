import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import { AddBlockChainByAdminType } from '@/types/BankBackground';
import { addBlockChainByAdminSchema } from '@/server/schemas/bankBackgroundSchema';
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
import CustomError from '@/server/errors/CustomError';
import AdminModel, { AdminDocument } from '@/server/models/adminModel';
import AdminDAO from '@/server/data/AdminDAO';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const addBlockchainData: AddBlockChainByAdminType = req.body;

      const admin: AdminDocument = (await AdminModel.findById(
        get(req.user, '_id')
      )) as AdminDocument;

      const user: UserDocument = (await UserModel.findById(
        addBlockchainData.userId
      )) as UserDocument;

      if (!user.uniqueID)
        throw new CustomError(
          'Bad Request',
          'User does not have digital id',
          400
        );

      // TODO: user private key must be admin
      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey ?? '');

      const bankBackground: BankBackgroundDocument =
        (await bankBackgroundModel.findById(
          addBlockchainData.id
        )) as BankBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      // TODO: user address must be admin
      const bankBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser,
        decryptedPrivateKey,
        user.address ?? ''
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
    checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO),
    addBlockChainByAdminSchema
  )
);
