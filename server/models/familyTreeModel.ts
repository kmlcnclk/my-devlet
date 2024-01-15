import mongoose from 'mongoose';
import { IFamilyTreeBackground } from '@/types/FamilyTreeBackground';

export interface FamilyTreeBackgroundDocument
  extends mongoose.Document,
    IFamilyTreeBackground {
  createdAt: Date;
  updatedAt: Date;
}

const familyTreeBackgroundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    familyTreeInfos: [
      {
        sequenceNumber: { type: String },
        gender: { type: String },
        degreeOfRelationship: {
          type: String,
        },
        name: {
          type: String,
        },
        surname: {
          type: String,
        },
        fathersName: {
          type: String,
        },
        mothersName: {
          type: String,
        },
        placeOfBirth: {
          type: String,
        },
        dateOfBirth: {
          type: Date,
        },
        cityDistrictNeighbourhoodVillage: {
          type: String,
        },
        maritalStatus: {
          type: String,
        },
        status: {
          type: String,
        },
        dateOfDeath: {
          type: Date,
        },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const familyTreeBackgroundModel =
  mongoose.models.FamilyTreeBackground ||
  mongoose.model<FamilyTreeBackgroundDocument>(
    'FamilyTreeBackground',
    familyTreeBackgroundSchema
  );

export default familyTreeBackgroundModel;
