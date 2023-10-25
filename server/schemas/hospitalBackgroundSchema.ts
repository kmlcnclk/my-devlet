import { array, object, string } from 'zod';

export const createHospitalBackgroundSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    diseaseInfos: array(
      object({
        hospitalName: string().optional(),
        doctorName: string().optional(),
        name: string().optional(),
        symptoms: string().optional(),
        diagnosticMethods: string().optional(),
        treatmentOptions: string().optional(),
        importantInformation: string().optional(),
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
