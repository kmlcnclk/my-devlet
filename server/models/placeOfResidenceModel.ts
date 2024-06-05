import mongoose from "mongoose";
import { IPlaceOfResidence } from "@/types/PlaceOfResidence";

export interface PlaceOfResidenceDocument
  extends mongoose.Document,
    IPlaceOfResidence {
  createdAt: Date;
  updatedAt: Date;
}

const placeOfResidenceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    placeOfResidenceInfos: [
      {
        name: { type: String },
        surname: { type: String },
        typeOfAddress: { type: String },
        locationOfAddress: { type: String },
        isCurrentAddress: { type: Boolean, default: false },
        settlementDate: { type: Date },
        leavingDate: { type: Date },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const placeOfResidenceModel =
  mongoose.models.PlaceOfResidence ||
  mongoose.model<PlaceOfResidenceDocument>(
    "PlaceOfResidence",
    placeOfResidenceSchema
  );

export default placeOfResidenceModel;
