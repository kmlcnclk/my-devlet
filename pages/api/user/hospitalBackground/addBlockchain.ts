import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/HospitalBackground';
import { addBlockChainSchema } from '@/server/schemas/hospitalBackgroundSchema';
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

      const hospitalBackground: HospitalBackgroundDocument =
        (await hospitalBackgroundModel.findById(
          addBlockchainData.id
        )) as HospitalBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const hospitalBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[0],
        decryptedPrivateKey,
        user.address
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
    checkJwtAndUserExist<typeof UserDAO>(handler, UserDAO),
    addBlockChainSchema
  )
);
