import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';
import UserDAO from '@/server/data/UserDAO';

import { AddBlockChainType } from '@/types/AssetBackground';
import { addBlockChainSchema } from '@/server/schemas/assetBackgroundSchema';
import assetBackgroundModel, {
  AssetBackgroundDocument,
} from '@/server/models/assetModel';
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

      const assetBackground: AssetBackgroundDocument =
        (await assetBackgroundModel.findById(
          addBlockchainData.id
        )) as AssetBackgroundDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const assetBackgroundService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[1],
        decryptedPrivateKey,
        user.address,
        '1'
      );

      const names = assetBackground.assetInfos.map((item) => item.name);
      const typeOfAssets = assetBackground.assetInfos.map(
        (item) => item.typeOfAsset
      );
      const descriptions = assetBackground.assetInfos.map(
        (item) => item.description
      );
      const locations = assetBackground.assetInfos.map((item) => item.location);
      const purchaseDates = assetBackground.assetInfos.map((item) =>
        new Date(item.purchaseDate).getTime()
      );
      const purchasePrices = assetBackground.assetInfos.map((item) =>
        Number(item.purchasePrice)
      );
      const previousOwners = assetBackground.assetInfos.map(
        (item) => item.previousOwner
      );

      await assetBackgroundService.setAssetRecord(
        user.address,
        user.uniqueID,
        names,
        typeOfAssets,
        descriptions,
        locations,
        purchaseDates,
        purchasePrices,
        previousOwners,
        addBlockchainData.ipfsHash
      );

      assetBackground.ipfsHash = await addBlockchainData.ipfsHash;
      await assetBackground.save();

      const newAssetBackground: AssetBackgroundDocument =
        (await assetBackgroundModel.findById(
          assetBackground._id
        )) as AssetBackgroundDocument;

      return res.status(200).json({
        message: 'Asset Background successfully added to blockchain',
        eb: newAssetBackground,
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
