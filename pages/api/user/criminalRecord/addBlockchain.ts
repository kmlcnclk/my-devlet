import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/CriminalRecord';
import { addBlockChainSchema } from '@/server/schemas/criminalRecordSchema';
import criminalRecordModel, {
  CriminalRecordDocument,
} from '@/server/models/criminalRecordModel';
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

      const criminalRecord: CriminalRecordDocument =
        (await criminalRecordModel.findById(
          addBlockchainData.id
        )) as CriminalRecordDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const criminalRecordService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser,
        decryptedPrivateKey,
        user.address
      );

      const caseNumbers = criminalRecord.criminalRecordInfos.map(
        (item) => item.caseNumber
      );
      const courts = criminalRecord.criminalRecordInfos.map(
        (item) => item.court
      );
      const prosecutors = criminalRecord.criminalRecordInfos.map(
        (item) => item.prosecutor
      );
      const defendants = criminalRecord.criminalRecordInfos.map(
        (item) => item.defendant
      );
      const trialOutcomes = criminalRecord.criminalRecordInfos.map(
        (item) => item.trialOutcome
      );
      const evidences = criminalRecord.criminalRecordInfos.map(
        (item) => item.evidence
      );
      const lawyerss = criminalRecord.criminalRecordInfos.map(
        (item) => item.lawyers
      );
      const incidentDates = criminalRecord.criminalRecordInfos.map((item) =>
        new Date(item.incidentDate).getTime()
      );
      const trialDates = criminalRecord.criminalRecordInfos.map((item) =>
        new Date(item.trialDate).getTime()
      );

      await criminalRecordService.setCriminalRecordRecord(
        user.address,
        user.uniqueID,
        caseNumbers,
        courts,
        prosecutors,
        defendants,
        incidentDates,
        trialDates,
        trialOutcomes,
        evidences,
        lawyerss,
        addBlockchainData.ipfsHash
      );

      criminalRecord.ipfsHash = await addBlockchainData.ipfsHash;
      await criminalRecord.save();

      const newCriminalRecord: CriminalRecordDocument =
        (await criminalRecordModel.findById(
          criminalRecord._id
        )) as CriminalRecordDocument;

      return res.status(200).json({
        message: 'Criminal Record successfully added to blockchain',
        eb: newCriminalRecord,
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
