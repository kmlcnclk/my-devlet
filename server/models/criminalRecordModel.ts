import mongoose from 'mongoose';
import { ICriminalRecord } from '@/types/CriminalRecord';

export interface CriminalRecordDocument
  extends mongoose.Document,
    ICriminalRecord {
  createdAt: Date;
  updatedAt: Date;
}

const criminalRecordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    criminalRecordInfos: [
      {
        caseNumber: { type: String },
        court: { type: String },
        prosecutor: { type: String },
        defendant: { type: String },
        incidentDate: { type: Date },
        trialDate: { type: Date },
        trialOutcome: { type: String },
        evidence: { type: String },
        lawyers: { type: String },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const criminalRecordModel =
  mongoose.models.CriminalRecord ||
  mongoose.model<CriminalRecordDocument>(
    'CriminalRecord',
    criminalRecordSchema
  );

export default criminalRecordModel;
