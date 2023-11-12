import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { AddBlockChainByAdminType } from '@/types/HospitalBackground';
import { addBlockChainByAdminSchema } from '@/server/schemas/hospitalBackgroundSchema';
import hospitalBackgroundModel, {
  HospitalBackgroundDocument,
} from '@/server/models/hospitalBackgroundModel';
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

      const hospitalBackground: HospitalBackgroundDocument =
        (await hospitalBackgroundModel.findById(
          addBlockchainData.id
        )) as HospitalBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      // TODO: user address must be admin
      const hospitalBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser,
        decryptedPrivateKey,
        user.address ?? ''
      );

      const hospitalNames = hospitalBackground.diseaseInfos.map(
        (item) => item.hospitalName
      );
      const doctorNames = hospitalBackground.diseaseInfos.map(
        (item) => item.doctorName
      );
      const names = hospitalBackground.diseaseInfos.map((item) => item.name);
      const symptomss = hospitalBackground.diseaseInfos.map(
        (item) => item.symptoms
      );
      const diagnosticMethodss = hospitalBackground.diseaseInfos.map(
        (item) => item.diagnosticMethods
      );
      const dates = hospitalBackground.diseaseInfos.map((item) =>
        new Date(item.date).getTime()
      );
      const treatmentOptionss = hospitalBackground.diseaseInfos.map(
        (item) => item.treatmentOptions
      );
      const importantInformations = hospitalBackground.diseaseInfos.map(
        (item) => item.importantInformation
      );

      await hospitalBackgroundService.setHospitalRecord(
        user.address,
        user.uniqueID,
        hospitalNames,
        doctorNames,
        names,
        symptomss,
        diagnosticMethodss,
        dates,
        treatmentOptionss,
        importantInformations,
        addBlockchainData.ipfsHash
      );

      hospitalBackground.ipfsHash = await addBlockchainData.ipfsHash;
      await hospitalBackground.save();

      const newHospitalBackground: HospitalBackgroundDocument =
        (await hospitalBackgroundModel.findById(
          hospitalBackground._id
        )) as HospitalBackgroundDocument;

      return res.status(200).json({
        message: 'Hospital Background successfully added to blockchain',
        eb: newHospitalBackground,
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
