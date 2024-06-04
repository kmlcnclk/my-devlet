import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types/next";

import validateResource from "@/server/middlewares/validateResource";
import { checkJwtAndUserExist } from "@/server/middlewares/jwt";
import UserDAO from "@/server/data/UserDAO";

import { AddBlockChainType } from "@/types/TrafficDebt";
import { addBlockChainSchema } from "@/server/schemas/trafficDebtSchema";
import trafficDebtModel, {
  TrafficDebtDocument,
} from "@/server/models/trafficDebtModel";
import { get } from "lodash";
import SmartContractModel, {
  SmartContractDocument,
} from "@/server/models/smartContractModel";
import UserModel, { UserDocument } from "@/server/models/userModel";
import UserService from "@/server/services/UserService";
import Web3Service from "@/server/services/Web3Service";
import { openMongooseConnection } from "@/server/middlewares/openDBConnection";
import CustomError from "@/server/errors/CustomError";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const addBlockchainData: AddBlockChainType = req.body;

      const user: UserDocument = (await UserModel.findById(
        get(req.user, "_id")
      )) as UserDocument;

      if (!user.uniqueID)
        throw new CustomError("Bad Request", "You do not have digital id", 400);

      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey);

      const trafficDebt: TrafficDebtDocument = (await trafficDebtModel.findById(
        addBlockchainData.id
      )) as TrafficDebtDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const trafficDebtService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[1],
        decryptedPrivateKey,
        user.address,
        "1"
      );

      const debtPayers = trafficDebt.trafficDebtInfos.map(
        (item) => item.debtPayer
      );
      const debtAmounts = trafficDebt.trafficDebtInfos.map(
        (item) => item.debtAmount
      );
      const licensePlates = trafficDebt.trafficDebtInfos.map(
        (item) => item.licensePlate
      );
      const isPaids = trafficDebt.trafficDebtInfos.map((item) => item.isPaid);
      const paymentAmounts = trafficDebt.trafficDebtInfos.map(
        (item) => item.paymentAmount
      );
      const expiryDates = trafficDebt.trafficDebtInfos.map((item) =>
        new Date(item.expiryDate).getTime()
      );
      const paymentDates = trafficDebt.trafficDebtInfos.map((item) =>
        new Date(item.paymentDate).getTime()
      );

      await trafficDebtService.setTrafficDebtRecord(
        user.address,
        user.uniqueID,
        debtPayers,
        debtAmounts,
        expiryDates,
        licensePlates,
        isPaids,
        paymentDates,
        paymentAmounts,
        addBlockchainData.ipfsHash
      );

      trafficDebt.ipfsHash = await addBlockchainData.ipfsHash;
      await trafficDebt.save();

      const newTrafficDebt: TrafficDebtDocument =
        (await trafficDebtModel.findById(
          trafficDebt._id
        )) as TrafficDebtDocument;

      return res.status(200).json({
        message: "Traffic Debt successfully added to blockchain",
        eb: newTrafficDebt,
      });
    } catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({
          error: {
            name: err.name,
            message: err.message,
          },
        });
      }

      return res.status(500).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    }
  } else {
    return res.status(403).json({ message: "You have not a permission" });
  }
}

export default openMongooseConnection(
  validateResource(
    checkJwtAndUserExist<typeof UserDAO>(handler, UserDAO),
    addBlockChainSchema
  )
);
