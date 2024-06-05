import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types/next";

import validateResource from "@/server/middlewares/validateResource";
import { checkJwtAndUserExist } from "@/server/middlewares/jwt";

import { CreateType } from "@/types/PlaceOfResidence";
import { createPlaceOfResidenceSchema } from "@/server/schemas/placeOfResidenceSchema";
import placeOfResidenceModel from "@/server/models/placeOfResidenceModel";
import AdminDAO from "@/server/data/AdminDAO";
import CustomError from "@/server/errors/CustomError";
import { openMongooseConnection } from "@/server/middlewares/openDBConnection";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const placeOfResidenceData: CreateType = req.body;

      const placeOfResidence = await placeOfResidenceModel.findOne({
        userId: placeOfResidenceData.userId,
      });

      if (placeOfResidence) {
        throw new CustomError(
          "Bad Request",
          "User has already Place of Residence infos",
          400
        );
      }

      await placeOfResidenceModel.create({
        ...placeOfResidenceData,
      });

      return res.status(201).json({
        message: "Place of Residence successfully created",
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
    createPlaceOfResidenceSchema
  )
);
