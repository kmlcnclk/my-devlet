import { Model } from "mongoose";
import BaseDAO from "./BaseDAO";
import AdminModel, { AdminDocument } from "../models/adminModel";
import { IAdmin } from "@/types/Admin";

class AdminDAO extends BaseDAO<AdminDocument> {
  constructor(model: Model<any>) {
    super(model);
  }

  public async create(adminData: IAdmin): Promise<AdminDocument> {
    const admin = await AdminModel.create(adminData);
    return admin;
  }
}

export default new AdminDAO(AdminModel);
