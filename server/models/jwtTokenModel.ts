import mongoose from "mongoose";
import { UserDocument } from "./userModel";

export interface JwtTokenDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  refreshToken: string;
}

const jwtTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const JwtTokenModel =
  mongoose.models.JwtToken ||
  mongoose.model<JwtTokenDocument>("JwtToken", jwtTokenSchema);

export default JwtTokenModel;
