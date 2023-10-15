import mongoose from 'mongoose';
import { IEducationalBackground } from '@/types/EducationalBackground';

export interface EducationalBackgroundDocument
  extends mongoose.Document,
    IEducationalBackground {
  createdAt: Date;
  updatedAt: Date;
}

const educationalBackgroundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    schoolInfos: [
      {
        schoolName: { type: String },
        degree: { type: String },
        startedYear: { type: Number },
        graduationYear: { type: Number },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const educationalBackgroundModel =
  mongoose.models.EducationalBackground ||
  mongoose.model<EducationalBackgroundDocument>(
    'EducationalBackground',
    educationalBackgroundSchema
  );

export default educationalBackgroundModel;
