import { array, boolean, number, object, string } from "zod";

export const createPlaceOfResidenceSchema = object({
  body: object({
    userId: string({ required_error: "User id is required" }),
    placeOfResidenceInfos: array(
      object({
        name: string().optional(),
        surname: string().optional(),
        typeOfAddress: string().optional(),
        locationOfAddress: string().optional(),
        isCurrentAddress: boolean().optional(),
        settlementDate: string().optional(),
        leavingDate: string().optional(),
      })
    ),
  }),
});

export const addBlockChainSchema = object({
  body: object({
    id: string({ required_error: "Id is required" }),
    smartContract: string({ required_error: "Smart Contract is required" }),
    ipfsHash: string({ required_error: "IPFS Hash is required" }),
  }),
});

export const addBlockChainByAdminSchema = object({
  body: object({
    userId: string({ required_error: "User ID is required" }),
    id: string({ required_error: "Id is required" }),
    smartContract: string({ required_error: "Smart Contract is required" }),
    ipfsHash: string({ required_error: "IPFS Hash is required" }),
  }),
});
