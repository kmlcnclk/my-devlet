import { FamilyTreeBackgroundDocument } from '@/server/models/familyTreeModel';
import { SmartContractDocument } from '@/server/models/smartContractModel';
import { UserDocument } from '@/server/models/userModel';

export interface IFamilyTreeBackground {
  userId: UserDocument['_id'];
  familyTreeInfos: Array<{
    sequenceNumber: string;
    gender: string;
    degreeOfRelationship: string;
    name: string;
    surname: string;
    fathersName: string;
    mothersName: string;
    placeOfBirth: string;
    dateOfBirth: Date;
    cityDistrictNeighbourhoodVillage: string;
    maritalStatus: string;
    status: string;
    dateOfDeath: Date;
  }>;
  ipfsHash: string;
}

export type CreateType = Omit<
  Omit<IFamilyTreeBackground, 'ipfsHash'>,
  'accountOpeningDate'
>;

export type AddBlockChainType = {
  id: FamilyTreeBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type AddBlockChainByAdminType = {
  userId: UserDocument['_id'];
  id: FamilyTreeBackgroundDocument['_id'];
  smartContract: SmartContractDocument['_id'];
  ipfsHash: string;
};

export type FamilyTreeBackgroundReturnType = IFamilyTreeBackground & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
