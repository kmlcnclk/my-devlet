import { omit } from "lodash";

import AdminModel, { AdminDocument } from "../models/adminModel";
import CustomError from "../errors/CustomError";

class AdminService {
  constructor() {}

  async checkUserExistWithEmail(email: string): Promise<AdminDocument> {
    const admin = await AdminModel.findOne({ email });
    if (!admin) throw new CustomError("Not Found", "Email is not exist", 404);
    return admin;
  }

  async validatePasswordWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AdminDocument> {
    const admin = await this.checkUserExistWithEmail(email);

    const isValid = await admin.comparePassword(password);
    if (!isValid)
      throw new CustomError("Bad Request", "Password is not correct", 400);

    return omit(admin.toJSON(), "password") as AdminDocument;
  }
}

export default new AdminService();
