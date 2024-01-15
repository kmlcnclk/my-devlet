import { array, object, string } from 'zod';

export const createFamilyTreeBackgroundSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }),
    familyTreeInfos: array(
      object({
        sequenceNumber: string().optional(),
        gender: string().optional(),
        degreeOfRelationship: string().optional(),
        name: string().optional(),
        surname: string().optional(),
        fathersName: string().optional(),
        mothersName: string().optional(),
        placeOfBirth: string().optional(),
        dateOfBirth: string().optional(),
        cityDistrictNeighbourhoodVillage: string().optional(),
        maritalStatus: string().optional(),
        status: string().optional(),
        dateOfDeath: string().optional(),
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
