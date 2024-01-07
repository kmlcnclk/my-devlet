import { UserDocument } from '@/server/models/userModel';

export interface ISmartContract {
  userId: UserDocument['_id'];
  name: string;
  network: string;
  contractAddressOfUser: string[];
  userWallet: string;
}

export type CreateType = Omit<ISmartContract, 'userId'>;

export type SmartContractReturnType = ISmartContract & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
