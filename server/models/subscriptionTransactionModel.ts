import mongoose from "mongoose";
import { ISubscriptionTransaction } from "@/types/SubscriptionTransaction";

export interface SubscriptionTransactionDocument
  extends mongoose.Document,
    ISubscriptionTransaction {
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionTransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subscriptionTransactionInfos: [
      {
        subscriptionType: { type: String },
        companyName: { type: String },
        subscriptionStartDate: {
          type: Date,
        },
        subscriptionEndDate: {
          type: Date,
        },
        subscriberName: {
          type: String,
        },
        subscriberSurname: {
          type: String,
        },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const subscriptionTransactionModel =
  mongoose.models.SubscriptionTransaction ||
  mongoose.model<SubscriptionTransactionDocument>(
    "SubscriptionTransaction",
    subscriptionTransactionSchema
  );

export default subscriptionTransactionModel;
