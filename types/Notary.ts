import { NotaryDocument } from '@/server/models/notaryModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface INotary {
  userId: UserDocument['_id'];
  notaryInfos: Array<{
    title: string;
    description: string;
    date: Date;
    notaryName: string;
    typeOfDocument: string;
    partiesInvolved: string;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<INotary, 'ipfsHash'>;

export type AddBlockChainType = {
  id: NotaryDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument['_id'];
  id: NotaryDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type NotaryReturnType = INotary & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
