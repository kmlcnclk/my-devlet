import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types/next";

import validateResource from "@/server/middlewares/validateResource";
import { checkJwtAndUserExist } from "@/server/middlewares/jwt";

import { CreateType } from "@/types/SubscriptionTransaction";
import { createSubscriptionTransactionSchema } from "@/server/schemas/subscriptionTransactionSchema";
import subscriptionTransactionModel from "@/server/models/subscriptionTransactionModel";
import AdminDAO from "@/server/data/AdminDAO";
import CustomError from "@/server/errors/CustomError";
import { openMongooseConnection } from "@/server/middlewares/openDBConnection";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const subscriptionTransactionData: CreateType = req.body;

      const subscriptionTransactionBg =
        await subscriptionTransactionModel.findOne({
          userId: subscriptionTransactionData.userId,
        });

      if (subscriptionTransactionBg) {
        throw new CustomError(
          "Bad Request",
          "User has already Subscription Transaction infos",
          400
        );
      }

      await subscriptionTransactionModel.create({
        ...subscriptionTransactionData,
      });

      return res.status(201).json({
        message: "Subscription Transaction successfully created",
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
    createSubscriptionTransactionSchema
  )
);
