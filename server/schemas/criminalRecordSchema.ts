import { array, object, string } from 'zod';

export const createCriminalRecordSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    criminalRecordInfos: array(
      object({
        caseNumber: string().optional(),
        court: string().optional(),
        prosecutor: string().optional(),
        defendant: string().optional(),
        incidentDate: string().optional(),
        trialDate: string().optional(),
        trialOutcome: string().optional(),
        evidence: string().optional(),
        lawyers: string().optional(),
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
