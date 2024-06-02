import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types/next";

import validateResource from "@/server/middlewares/validateResource";
import { checkJwtAndUserExist } from "@/server/middlewares/jwt";
import { AddBlockChainByAdminType } from "@/types/SubscriptionTransaction";
import { addBlockChainByAdminSchema } from "@/server/schemas/subscriptionTransactionSchema";
import subscriptionTransactionModel, {
  SubscriptionTransactionDocument,
} from "@/server/models/subscriptionTransactionModel";
import { get } from "lodash";
import SmartContractModel, {
  SmartContractDocument,
} from "@/server/models/smartContractModel";
import UserModel, { UserDocument } from "@/server/models/userModel";
import UserService from "@/server/services/UserService";
import Web3Service from "@/server/services/Web3Service";
import { openMongooseConnection } from "@/server/middlewares/openDBConnection";
import CustomError from "@/server/errors/CustomError";
import AdminModel, { AdminDocument } from "@/server/models/adminModel";
import AdminDAO from "@/server/data/AdminDAO";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const addBlockchainData: AddBlockChainByAdminType = req.body;

      const admin: AdminDocument = (await AdminModel.findById(
        get(req.user, "_id")
      )) as AdminDocument;

      const user: UserDocument = (await UserModel.findById(
        addBlockchainData.userId
      )) as UserDocument;

      if (!user.uniqueID)
        throw new CustomError(
          "Bad Request",
          "User does not have digital id",
          400
        );

      // TODO: user private key must be admin
      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey ?? "");

      const subscriptionTransaction: SubscriptionTransactionDocument =
        (await subscriptionTransactionModel.findById(
          addBlockchainData.id
        )) as SubscriptionTransactionDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      // TODO: user address must be admin
      const subscriptionTransactionService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[1],
        decryptedPrivateKey,
        user.address ?? "",
        "1"
      );

      const companyNames =
        subscriptionTransaction.subscriptionTransactionInfos.map(
          (item) => item.companyName
        );
      const subscriberNames =
        subscriptionTransaction.subscriptionTransactionInfos.map(
          (item) => item.subscriberName
        );

      const subscriberSurnames =
        subscriptionTransaction.subscriptionTransactionInfos.map(
          (item) => item.subscriberSurname
        );
      const subscriptionTypes =
        subscriptionTransaction.subscriptionTransactionInfos.map(
          (item) => item.subscriptionType
        );

      const subscriptionStartDates =
        subscriptionTransaction.subscriptionTransactionInfos.map((item) =>
          new Date(item.subscriptionStartDate).getTime()
        );

      const subscriptionEndDates =
        subscriptionTransaction.subscriptionTransactionInfos.map((item) =>
          new Date(item.subscriptionEndDate).getTime()
        );

      await subscriptionTransactionService.setSubscriptionTransactionRecord(
        user.address,
        user.uniqueID,
        subscriptionTypes,
        companyNames,
        subscriptionStartDates,
        subscriptionEndDates,
        subscriberNames,
        subscriberSurnames,
        addBlockchainData.ipfsHash
      );

      subscriptionTransaction.ipfsHash = await addBlockchainData.ipfsHash;
      await subscriptionTransaction.save();

      const newSubscriptionTransaction: SubscriptionTransactionDocument =
        (await subscriptionTransactionModel.findById(
          subscriptionTransaction._id
        )) as SubscriptionTransactionDocument;

      return res.status(200).json({
        message: "Subscription Transaction successfully added to blockchain",
        eb: newSubscriptionTransaction,
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
    checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO),
    addBlockChainByAdminSchema
  )
);
