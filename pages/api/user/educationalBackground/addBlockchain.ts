import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/EducationalBackground';
import { addBlockChainSchema } from '@/server/schemas/educationalBackgroundSchema';
import educationalBackgroundModel, {
  EducationalBackgroundDocument,
} from '@/server/models/educationalBackgroundModel';
import { get } from 'lodash';
import SmartContractModel, {
  SmartContractDocument,
} from '@/server/models/smartContractModel';
import UserModel, { UserDocument } from '@/server/models/userModel';
import UserService from '@/server/services/UserService';
import Web3Service from '@/server/services/Web3Service';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const addBlockchainData: AddBlockChainType = req.body;

      const user: UserDocument = (await UserModel.findById(
        get(req.user, '_id')
      )) as UserDocument;

      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey);

      const educationalBackground: EducationalBackgroundDocument =
        (await educationalBackgroundModel.findById(
          addBlockchainData.id
        )) as EducationalBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const educationalBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser,
        decryptedPrivateKey,
        user.address
      );

      const schoolNames = educationalBackground.schoolInfos.map(
        (item) => item.schoolName
      );
      const degrees = educationalBackground.schoolInfos.map(
        (item) => item.degree
      );
      const startedYears = educationalBackground.schoolInfos.map((item) =>
        Number(item.startedYear)
      );
      const graduationYears = educationalBackground.schoolInfos.map((item) =>
        Number(item.graduationYear)
      );

      await educationalBackgroundService.setEducationRecord(
        user.address,
        user.uniqueID,
        schoolNames,
        degrees,
        startedYears,
        graduationYears,
        addBlockchainData.ipfsHash
      );

      educationalBackground.ipfsHash = await addBlockchainData.ipfsHash;
      await educationalBackground.save();

      const newEducationalBackground: EducationalBackgroundDocument =
        (await educationalBackgroundModel.findById(
          educationalBackground._id
        )) as EducationalBackgroundDocument;

      return res.status(200).json({
        message: 'Educational Background successfully added to blockchain',
        eb: newEducationalBackground,
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

export default validateResource(
  checkJwtAndUserExist<typeof UserDAO>(handler, UserDAO),
  addBlockChainSchema
);
