import { array, boolean, number, object, string } from 'zod';

export const createTaxDebtSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    taxDebtInfos: array(
      object({
        taxpayer: string().optional(),
        debtAmount: number().optional(),
        expiryDate: string().optional(),
        typeOfTax: string().optional(),
        isPaid: boolean().optional(),
        paymentDate: string().optional(),
        paymentAmount: number().optional(),
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
