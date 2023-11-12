import { array, number, object, string } from 'zod';

export const createBankBackgroundSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    bankInfos: array(
      object({
        bankName: string().optional(),
        accountBalance: number().optional(),
        accountNumber: string().optional(),
        accountType: string().optional(),
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
