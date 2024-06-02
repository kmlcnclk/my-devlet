import { SubscriptionTransactionDocument } from "@/server/models/subscriptionTransactionModel";
import { SmartContractDocument } from "@/server/models/smartContractModel";
import { UserDocument } from "@/server/models/userModel";

export interface ISubscriptionTransaction {
  userId: UserDocument["_id"];
  subscriptionTransactionInfos: Array<{
    subscriptionType: string;
    companyName: string;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    subscriberName: string;
    subscriberSurname: string;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<ISubscriptionTransaction, "ipfsHash">;

export type AddBlockChainType = {
  id: SubscriptionTransactionDocument["_id"];
  smartContract: SmartContractDocument["_id"];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument["_id"];
  id: SubscriptionTransactionDocument["_id"];
  smartContract: SmartContractDocument["_id"];
  ipfsHash: string;
};

export type SubscriptionTransactionReturnType = ISubscriptionTransaction & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
