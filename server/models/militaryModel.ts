import mongoose from 'mongoose';
import { IMilitaryBackground } from '@/types/MilitaryBackground';

export interface MilitaryBackgroundDocument
  extends mongoose.Document,
    IMilitaryBackground {
  createdAt: Date;
  updatedAt: Date;
}

const militaryBackgroundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    militaryInfos: [
      {
        name: { type: String },
        dateOfBirth: { type: Date },
        stateOfMilitary: {
          type: String,
          enum: ['Done', 'Postponed', 'Exempt', 'Unspecified'],
        },
        postponementDate: {
          type: Date,
        },
        dateOfConstruction: {
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

const militaryBackgroundModel =
  mongoose.models.MilitaryBackground ||
  mongoose.model<MilitaryBackgroundDocument>(
    'MilitaryBackground',
    militaryBackgroundSchema
  );

export default militaryBackgroundModel;
