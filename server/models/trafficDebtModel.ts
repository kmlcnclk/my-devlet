import mongoose from "mongoose";
import { ITrafficDebt } from "@/types/TrafficDebt";

export interface TrafficDebtDocument extends mongoose.Document, ITrafficDebt {
  createdAt: Date;
  updatedAt: Date;
}

const trafficDebtSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trafficDebtInfos: [
      {
        debtPayer: { type: String },
        debtAmount: { type: Number },
        expiryDate: { type: Date },
        licensePlate: { type: String },
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

const trafficDebtModel =
  mongoose.models.TrafficDebt ||
  mongoose.model<TrafficDebtDocument>("TrafficDebt", trafficDebtSchema);

export default trafficDebtModel;
