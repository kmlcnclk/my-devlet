import { MilitaryBackgroundDocument } from '@/server/models/militaryModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface IMilitaryBackground {
  userId: UserDocument['_id'];
  militaryInfos: Array<{
    name: string;
    dateOfBirth: Date;
    stateOfMilitary: string;
    postponementDate: Date;
    dateOfConstruction: Date;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<
  Omit<IMilitaryBackground, 'ipfsHash'>,
  'accountOpeningDate'
>;

export type AddBlockChainType = {
  id: MilitaryBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument['_id'];
  id: MilitaryBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type MilitaryBackgroundReturnType = IMilitaryBackground & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
