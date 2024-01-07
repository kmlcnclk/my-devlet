import { array, number, object, string } from 'zod';

export const createAssetBackgroundSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    assetInfos: array(
      object({
        name: string().optional(),
        typeOfAsset: string().optional(),
        description: string().optional(),
        location: string().optional(),
        purchaseDate: string().optional(),
        purchasePrice: number().optional(),
        previousOwner: string().optional(),
      })
    ),
  }),
});

export const addBlockChainSchema = object({
  body: object({
    id: string({ required_error: 'Id is required' }),
    smartContract: string({ required_error: 'Smart Contract is required' }),
    ipfsHash: string({ required_error: 'IPFS Hash is required' }),
  }),
});

export const addBlockChainByAdminSchema = object({
  body: object({
    userId: string({ required_error: 'User ID is required' }),
    id: string({ required_error: 'Id is required' }),
    smartContract: string({ required_error: 'Smart Contract is required' }),
    ipfsHash: string({ required_error: 'IPFS Hash is required' }),
  }),
});
