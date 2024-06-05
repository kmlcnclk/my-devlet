import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types/next";

import { get } from "lodash";

import { checkJwtAndUserExist } from "@/server/middlewares/jwt";
import AdminDAO from "@/server/data/AdminDAO";
import placeOfResidenceModel from "@/server/models/placeOfResidenceModel";
import { openMongooseConnection } from "@/server/middlewares/openDBConnection";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const placeOfResidence = await placeOfResidenceModel.findOne({
        userId: get(req.query, "userId"),
      });

      return res.status(200).json({
        placeOfResidence,
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
  checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO)
);
