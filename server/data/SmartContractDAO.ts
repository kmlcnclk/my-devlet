import { Model } from "mongoose";
import BaseDAO from "./BaseDAO";
import SmartContractModel, {
  SmartContractDocument,
} from "../models/smartContractModel";
import { ISmartContract } from "@/types/SmartContract";

class SmartContractDAO extends BaseDAO<SmartContractDocument> {
  constructor(model: Model<any>) {
    super(model);
  }

  public async create(
    smartContractData: ISmartContract
  ): Promise<SmartContractDocument> {
    const smartContract = await SmartContractModel.create(smartContractData);
    return smartContract;
  }
}

export default new SmartContractDAO(SmartContractModel);
