import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/FamilyTreeBackground';
import { addBlockChainSchema } from '@/server/schemas/familyTreeBackgroundSchema';
import familyTreeBackgroundModel, {
  FamilyTreeBackgroundDocument,
} from '@/server/models/familyTreeModel';
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

      const familyTreeBackground: FamilyTreeBackgroundDocument =
        (await familyTreeBackgroundModel.findById(
          addBlockchainData.id
        )) as FamilyTreeBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const familyTreeBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[1],
        decryptedPrivateKey,
        user.address,
        '1'
      );

      const genders = familyTreeBackground.familyTreeInfos.map(
        (item) => item.gender
      );
      const degreeOfRelationships = familyTreeBackground.familyTreeInfos.map(
        (item) => item.degreeOfRelationship
      );
      const names = familyTreeBackground.familyTreeInfos.map(
        (item) => item.name
      );
      const surnames = familyTreeBackground.familyTreeInfos.map(
        (item) => item.surname
      );
      const fathersNames = familyTreeBackground.familyTreeInfos.map(
        (item) => item.fathersName
      );
      const mothersNames = familyTreeBackground.familyTreeInfos.map(
        (item) => item.mothersName
      );

      const dateOfBirths = familyTreeBackground.familyTreeInfos.map((item) =>
        new Date(item.dateOfBirth).getTime()
      );

      const statuss = familyTreeBackground.familyTreeInfos.map(
        (item) => item.status
      );

      const dateOfDeaths = familyTreeBackground.familyTreeInfos.map((item) =>
        new Date(item.dateOfDeath).getTime()
      );

      await familyTreeBackgroundService.setFamilyTreeRecord(
        user.address,
        user.uniqueID,
        genders,
        degreeOfRelationships,
        names,
        surnames,
        fathersNames,
        mothersNames,
        dateOfBirths,
        statuss,
        dateOfDeaths,
        addBlockchainData.ipfsHash
      );

      familyTreeBackground.ipfsHash = await addBlockchainData.ipfsHash;
      await familyTreeBackground.save();

      const newFamilyTreeBackground: FamilyTreeBackgroundDocument =
        (await familyTreeBackgroundModel.findById(
          familyTreeBackground._id
        )) as FamilyTreeBackgroundDocument;

      return res.status(200).json({
        message: 'Family Tree Background successfully added to blockchain',
        eb: newFamilyTreeBackground,
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
