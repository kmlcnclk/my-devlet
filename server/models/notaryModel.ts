import mongoose from 'mongoose';
import { INotary } from '@/types/Notary';

export interface NotaryDocument extends mongoose.Document, INotary {
  createdAt: Date;
  updatedAt: Date;
}

const notarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notaryInfos: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: Date, default: Date.now },
        notaryName: { type: String },
        typeOfDocument: { type: String },
        partiesInvolved: { type: String },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const notaryModel =
  mongoose.models.Notary ||
  mongoose.model<NotaryDocument>('Notary', notarySchema);

export default notaryModel;
