import { array, object, string } from 'zod';

export const createNotarySchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    notaryInfos: array(
      object({
        title: string().optional(),
        description: string().optional(),
        notaryName: string().optional(),
        typeOfDocument: string().optional(),
        partiesInvolved: string().optional(),
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
