import { CriminalRecordDocument } from '@/server/models/criminalRecordModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface ICriminalRecord {
  userId: UserDocument['_id'];
  criminalRecordInfos: Array<{
    caseNumber: string;
    court: string;
    prosecutor: string;
    defendant: string;
    incidentDate: Date;
    trialDate: Date;
    trialOutcome: string;
    evidence: string;
    lawyers: string;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<ICriminalRecord, 'ipfsHash'>;

export type AddBlockChainType = {
  id: CriminalRecordDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument['_id'];
  id: CriminalRecordDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type CriminalRecordReturnType = ICriminalRecord & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
