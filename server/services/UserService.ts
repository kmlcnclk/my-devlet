import { omit } from 'lodash';

import UserModel, { UserDocument } from '../models/userModel';
import CustomError from '../errors/CustomError';
import bcrypt from 'bcrypt';
import NodeRSA from 'node-rsa';

class UserService {
  saltWorkFactor: number;
  _key: any;

  constructor() {
    this.saltWorkFactor = process.env.SALT_WORK_FACTOR as number | 10;
    this._key = new NodeRSA(process.env.NODE_RSA_PRIVATE_KEY);
  }

  async hashingPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltWorkFactor);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  }

  async getUserWallet(userID: string): Promise<string> {
    const user = await UserModel.findById(userID);
    if (!user) throw new CustomError('Not Found', 'User is not exist', 404);
    return user.userWallet;
  }

  async checkUserExistWithEmail(email: string): Promise<UserDocument> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new CustomError('Not Found', 'Email is not exist', 404);
    return user;
  }

  async checkUserExistWithID(userID: string): Promise<UserDocument> {
    const user = await UserModel.findById(userID);
    if (!user) throw new CustomError('Not Found', 'User is not exist', 404);
    return user;
  }

  async validatePasswordWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserDocument> {
    const user = await this.checkUserExistWithEmail(email);

    const isValid = await user.comparePassword(password);
    if (!isValid)
      throw new CustomError('Bad Request', 'Password is not correct', 400);

    return omit(user.toJSON(), 'password') as UserDocument;
  }

  async validatePasswordWithID({
    userID,
    password,
  }: {
    userID: string;
    password: string;
  }): Promise<UserDocument> {
    const user = await this.checkUserExistWithID(userID);

    const isValid = await user.comparePassword(password);
    if (!isValid)
      throw new CustomError('Bad Request', 'Password is not correct', 400);

    return omit(user.toJSON(), 'password') as UserDocument;
  }

  async hashUserWalletPrivateKey(walletPrivateKey: string): Promise<string> {
    const encrypted = this._key.encrypt(walletPrivateKey, 'base64');
    return encrypted;
  }

  async decryptHashedWalletPrivateKey(hash: string): Promise<string> {
    const decrypted = this._key.decrypt(hash, 'utf8');
    return decrypted;
  }
}

export default new UserService();
