import { TrafficDebtDocument } from "@/server/models/trafficDebtModel";
import { SmartContractDocument } from "@/server/models/smartContractModel";
import { UserDocument } from "@/server/models/userModel";

export interface ITrafficDebt {
  userId: UserDocument["_id"];
  trafficDebtInfos: Array<{
    debtPayer: string;
    debtAmount: number;
    expiryDate: Date;
    licensePlate: string;
    isPaid: boolean;
    paymentDate: Date;
    paymentAmount: number;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<ITrafficDebt, "ipfsHash">;

export type AddBlockChainType = {
  id: TrafficDebtDocument["_id"];
  smartContract: SmartContractDocument["_id"];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument["_id"];
  id: TrafficDebtDocument["_id"];
  smartContract: SmartContractDocument["_id"];
  ipfsHash: string;
};

export type TrafficDebtReturnType = ITrafficDebt & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
