import { AssetBackgroundDocument } from '@/server/models/assetModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface IAssetBackground {
  userId: UserDocument['_id'];
  assetInfos: Array<{
    name: string;
    typeOfAsset: string;
    description: string;
    location: string;
    purchaseDate: Date;
    purchasePrice: number;
    previousOwner: string;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<
  Omit<IAssetBackground, 'ipfsHash'>,
  'accountOpeningDate'
>;

export type AddBlockChainType = {
  id: AssetBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument['_id'];
  id: AssetBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AssetBackgroundReturnType = IAssetBackground & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
