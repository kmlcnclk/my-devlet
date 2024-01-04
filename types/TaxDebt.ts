import { TaxDebtDocument } from '@/server/models/taxDebtModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface ITaxDebt {
  userId: UserDocument['_id'];
  taxDebtInfos: Array<{
    taxpayer: string;
    debtAmount: number;
    expiryDate: Date;
    typeOfTax: string;
    isPaid: boolean;
    paymentDate: Date;
    paymentAmount: number;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<ITaxDebt, 'ipfsHash'>;

export type AddBlockChainType = {
  id: TaxDebtDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument['_id'];
  id: TaxDebtDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type TaxDebtReturnType = ITaxDebt & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
