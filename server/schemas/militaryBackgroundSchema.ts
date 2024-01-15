import { array, object, string } from 'zod';

export const createMilitaryBackgroundSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    militaryInfos: array(
      object({
        name: string().optional(),
        dateOfBirth: string().optional(),
        stateOfMilitary: string().optional(),
        postponementDate: string().optional(),
        dateOfConstruction: string().optional(),
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
