import { Model } from "mongoose";
import BaseDAO from "./BaseDAO";
import UserModel, { UserDocument } from "../models/userModel";
import { IUser } from "@/types/User";

class UserDAO extends BaseDAO<UserDocument> {
  constructor(model: Model<any>) {
    super(model);
  }

  public async create(userData: IUser): Promise<UserDocument> {
    const user = await UserModel.create(userData);
    return user;
  }
}

export default new UserDAO(UserModel);
