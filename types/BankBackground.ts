import { BankBackgroundDocument } from '@/server/models/bankBackgroundModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface IBankBackground {
  userId: UserDocument['_id'];
  bankInfos: Array<{
    bankName: string;
    accountBalance: number;
    accountNumber: string;
    accountType: string;
    accountOpeningDate: Date;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<
  Omit<IBankBackground, 'ipfsHash'>,
  'accountOpeningDate'
>;

export type AddBlockChainType = {
  id: BankBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type BankBackgroundReturnType = IBankBackground & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
