import { SmartContractDocument } from '@/server/models/smartContractModel';

export interface IUser {
  email: string;
  name: string;
  password: string;
  uniqueID?: string;
  age: number;
  address: string;
  privateKey: string;
  isUserDataAddedToBlockchain?: boolean;
}

export type SignUpType = Omit<
  Omit<Omit<IUser, 'uniqueID'>, 'address'>,
  'privateKey'
> & {
  passwordConfirmation: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type AddBlockChainType = {
  smartContract: SmartContractDocument['_id'];
};

export type SignUpTypeWithGoogle = { email: string; name: string };
export type SignInTypeWithGoogle = { email: string };

export type ReturnedUserType = Omit<Omit<IUser, 'password'>, 'account'> & {
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};
