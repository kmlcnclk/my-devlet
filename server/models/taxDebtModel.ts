import mongoose from 'mongoose';
import { ITaxDebt } from '@/types/TaxDebt';

export interface TaxDebtDocument extends mongoose.Document, ITaxDebt {
  createdAt: Date;
  updatedAt: Date;
}

const taxDebtSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    taxDebtInfos: [
      {
        taxpayer: { type: String },
        debtAmount: { type: Number },
        expiryDate: { type: Date },
        typeOfTax: { type: String },
        isPaid: { type: Boolean, default: false },
        paymentDate: { type: Date },
        paymentAmount: { type: Number },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const taxDebtModel =
  mongoose.models.TaxDebt ||
  mongoose.model<TaxDebtDocument>('TaxDebt', taxDebtSchema);

export default taxDebtModel;
