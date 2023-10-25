import mongoose from 'mongoose';
import { IBankBackground } from '@/types/BankBackground';

export interface BankBackgroundDocument
  extends mongoose.Document,
    IBankBackground {
  createdAt: Date;
  updatedAt: Date;
}

const bankBackgroundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bankInfos: [
      {
        bankName: { type: String },
        accountBalance: { type: Number, default: 0 },
        accountNumber: { type: String },
        accountType: {
          type: String,
          enum: ['Personal', 'Business'],
          default: 'Personal',
        },
        accountOpeningDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const bankBackgroundModel =
  mongoose.models.BankBackground ||
  mongoose.model<BankBackgroundDocument>(
    'BankBackground',
    bankBackgroundSchema
  );

export default bankBackgroundModel;
