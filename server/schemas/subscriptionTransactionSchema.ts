import { array, object, string } from "zod";

export const createSubscriptionTransactionSchema = object({
  body: object({
    userId: string({ required_error: "User id is required" }),
    subscriptionTransactionInfos: array(
      object({
        subscriptionTypes: string().optional(),
        companyNames: string().optional(),
        subscriptionStartDates: string().optional(),
        subscriptionEndDates: string().optional(),
        subscriberNames: string().optional(),
        subscriberSurnames: string().optional(),
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
