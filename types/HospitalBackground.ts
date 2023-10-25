import { HospitalBackgroundDocument } from '@/server/models/hospitalBackgroundModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface IHospitalBackground {
  userId: UserDocument['_id'];
  diseaseInfos: Array<{
    hospitalName: string;
    doctorName: string;
    name: string;
    symptoms: string;
    diagnosticMethods: string;
    date: Date;
    treatmentOptions: string;
    importantInformation: string;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<IHospitalBackground, 'ipfsHash'>;

export type AddBlockChainType = {
  id: HospitalBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type HospitalBackgroundReturnType = IHospitalBackground & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
