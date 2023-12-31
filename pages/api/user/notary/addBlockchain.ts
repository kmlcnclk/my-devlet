import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/Notary';
import { addBlockChainSchema } from '@/server/schemas/notarySchema';
import notaryModel, { NotaryDocument } from '@/server/models/notaryModel';
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

      const notary: NotaryDocument = (await notaryModel.findById(
        addBlockchainData.id
      )) as NotaryDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const notaryService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[0],
        decryptedPrivateKey,
        user.address,
        '0'
      );

      const titles = notary.notaryInfos.map((item) => item.title);
      const descriptions = notary.notaryInfos.map((item) => item.description);
      const notaryNames = notary.notaryInfos.map((item) => item.notaryName);
      const typeOfDocuments = notary.notaryInfos.map(
        (item) => item.typeOfDocument
      );
      const partiesInvolveds = notary.notaryInfos.map(
        (item) => item.partiesInvolved
      );
      const dates = notary.notaryInfos.map((item) =>
        new Date(item.date).getTime()
      );

      await notaryService.setNotaryRecord(
        user.address,
        user.uniqueID,
        titles,
        descriptions,
        dates,
        notaryNames,
        typeOfDocuments,
        partiesInvolveds,
        addBlockchainData.ipfsHash
      );

      notary.ipfsHash = await addBlockchainData.ipfsHash;
      await notary.save();

      const newNotary: NotaryDocument = (await notaryModel.findById(
        notary._id
      )) as NotaryDocument;

      return res.status(200).json({
        message: 'Notary successfully added to blockchain',
        eb: newNotary,
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
