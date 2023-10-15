import { Model } from "mongoose";
import JwtTokenModel, { JwtTokenDocument } from "../models/jwtTokenModel";
import BaseDAO from "./BaseDAO";

class JwtTokenDAO extends BaseDAO<JwtTokenDocument> {
  constructor(model: Model<any>) {
    super(model);
  }

  public async create(
    user: JwtTokenDocument["user"],
    accessToken: JwtTokenDocument["accessToken"],
    refreshToken: JwtTokenDocument["refreshToken"]
  ): Promise<object> {
    const jwtToken = new JwtTokenModel({ user, accessToken, refreshToken });
    const newToken = await jwtToken.save();
    return {
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    };
  }
}

export default new JwtTokenDAO(JwtTokenModel);
