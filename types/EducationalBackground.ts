import { EducationalBackgroundDocument } from '@/server/models/educationalBackgroundModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface IEducationalBackground {
  userId: UserDocument['_id'];
  schoolInfos: Array<{
    schoolName: string;
    degree: string;
    startedYear: Number;
    graduationYear: Number;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<IEducationalBackground, 'ipfsHash'>;

export type AddBlockChainType = {
  id: EducationalBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type EducationalBackgroundReturnType = IEducationalBackground & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
