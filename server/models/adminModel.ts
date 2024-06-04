import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IAdmin } from "@/types/Admin";

const saltWorkFactor = process.env.SALT_WORK_FACTOR as number | 10;

export interface AdminDocument extends IAdmin, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    ip: { type: String },
    uniqueID: { type: String, required: true },
    address: { type: String, required: true },
    privateKey: { type: String, required: true },
    status: {
      type: String,
      default: "active",
      enum: ["active", "passive", "frozen", "suspended"],
    },
    role: {
      type: String,
      required: true,
      enum: [
        "government",
        "school",
        "bank",
        "hospital",
        "notary",
        "taxDebt",
        "criminalRecord",
        "asset",
        "military",
        "familyTree",
        "subscriptionTransaction",
        "trafficDebt",
      ],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  let admin = this as AdminDocument;

  if (!admin.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(admin.password, salt);
  admin.password = hash;
  return next();
});

adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const admin = this as AdminDocument;

  return bcrypt.compare(candidatePassword, admin.password).catch((e) => false);
};

const AdminModel =
  mongoose.models.Admin || mongoose.model<AdminDocument>("Admin", adminSchema);

export default AdminModel;
