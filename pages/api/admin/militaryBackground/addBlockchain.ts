import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import { AddBlockChainByAdminType } from '@/types/MilitaryBackground';
import { addBlockChainByAdminSchema } from '@/server/schemas/militaryBackgroundSchema';
import militaryBackgroundModel, {
  MilitaryBackgroundDocument,
} from '@/server/models/militaryModel';
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
        await UserService.decryptHashedWalletPrivateKey(admin.privateKey ?? '');

      const militaryBackground: MilitaryBackgroundDocument =
        (await militaryBackgroundModel.findById(
          addBlockchainData.id
        )) as MilitaryBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      // TODO: user address must be admin
      const militaryBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[1],
        decryptedPrivateKey,
        admin.address ?? '',
        '1'
      );

      const names = militaryBackground.militaryInfos.map((item) => item.name);

      const dateOfBirths = militaryBackground.militaryInfos.map((item) =>
        new Date(item.dateOfBirth).getTime()
      );

      const stateOfMilitarys = militaryBackground.militaryInfos.map(
        (item) => item.stateOfMilitary
      );
      const postponementDates = militaryBackground.militaryInfos.map((item) =>
        new Date(item.postponementDate).getTime()
      );
      const dateOfConstructions = militaryBackground.militaryInfos.map((item) =>
        new Date(item.dateOfConstruction).getTime()
      );
      console.log(
        names,
        dateOfBirths,
        stateOfMilitarys,
        postponementDates,
        dateOfConstructions
      );
      await militaryBackgroundService.setMilitaryRecord(
        user.address,
        user.uniqueID,
        names,
        dateOfBirths,
        stateOfMilitarys,
        postponementDates,
        dateOfConstructions,
        addBlockchainData.ipfsHash
      );

      militaryBackground.ipfsHash = await addBlockchainData.ipfsHash;
      await militaryBackground.save();

      const newMilitaryBackground: MilitaryBackgroundDocument =
        (await militaryBackgroundModel.findById(
          militaryBackground._id
        )) as MilitaryBackgroundDocument;

      return res.status(200).json({
        message: 'Military Background successfully added to blockchain',
        eb: newMilitaryBackground,
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
