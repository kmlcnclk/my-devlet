import { array, number, object, string } from 'zod';

export const createEducationalBackgroundSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    schoolInfos: array(
      object({
        schoolName: string().optional(),
        degree: string().optional(),
        startedYear: number().optional(),
        graduationYear: number().optional(),
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
