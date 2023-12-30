import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@/types/User';

const saltWorkFactor = (Number(process.env.SALT_WORK_FACTOR) as number) || 10;

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    identityNumber: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    uniqueID: { type: String },
    address: { type: String, required: true },
    privateKey: { type: String, required: true },
    isUserDataAddedToBlockchain: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
