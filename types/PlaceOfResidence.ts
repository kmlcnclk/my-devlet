import { PlaceOfResidenceDocument } from "@/server/models/placeOfResidenceModel";
import { SmartContractDocument } from "@/server/models/smartContractModel";
import { UserDocument } from "@/server/models/userModel";

export interface IPlaceOfResidence {
  userId: UserDocument["_id"];
  placeOfResidenceInfos: Array<{
    name: string;
    surname: string;
    typeOfAddress: string;
    locationOfAddress: string;
    isCurrentAddress: boolean;
    settlementDate: Date;
    leavingDate: Date;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<IPlaceOfResidence, "ipfsHash">;

export type AddBlockChainType = {
  id: PlaceOfResidenceDocument["_id"];
  smartContract: SmartContractDocument["_id"];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument["_id"];
  id: PlaceOfResidenceDocument["_id"];
  smartContract: SmartContractDocument["_id"];
  ipfsHash: string;
};

export type PlaceOfResidenceReturnType = IPlaceOfResidence & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
