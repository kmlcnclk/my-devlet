import mongoose from 'mongoose';
import { IHospitalBackground } from '@/types/HospitalBackground';

export interface HospitalBackgroundDocument
  extends mongoose.Document,
    IHospitalBackground {
  createdAt: Date;
  updatedAt: Date;
}

const hospitalBackgroundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    diseaseInfos: [
      {
        hospitalName: { type: String },
        doctorName: { type: String },
        name: { type: String },
        symptoms: { type: String },
        diagnosticMethods: { type: String },
        date: { type: Date, default: Date.now },
        treatmentOptions: { type: String },
        importantInformation: { type: String },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const hospitalBackgroundModel =
  mongoose.models.HospitalBackground ||
  mongoose.model<HospitalBackgroundDocument>(
    'HospitalBackground',
    hospitalBackgroundSchema
  );

export default hospitalBackgroundModel;
