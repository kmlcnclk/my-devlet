import mongoose from 'mongoose';
import { ISmartContract } from '@/types/SmartContract';

export interface SmartContractDocument
  extends ISmartContract,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const smartContractSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    network: { type: String, required: true },
    contractAddressOfUser: { type: String },
    userWallet: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SmartContractModel =
  mongoose.models.SmartContract ||
  mongoose.model<SmartContractDocument>('SmartContract', smartContractSchema);

export default SmartContractModel;
