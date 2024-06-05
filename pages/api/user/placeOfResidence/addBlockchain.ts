import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types/next";

import validateResource from "@/server/middlewares/validateResource";
import { checkJwtAndUserExist } from "@/server/middlewares/jwt";
import UserDAO from "@/server/data/UserDAO";

import { AddBlockChainType } from "@/types/PlaceOfResidence";
import { addBlockChainSchema } from "@/server/schemas/placeOfResidenceSchema";
import placeOfResidenceModel, {
  PlaceOfResidenceDocument,
} from "@/server/models/placeOfResidenceModel";
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

      const placeOfResidence: PlaceOfResidenceDocument =
        (await placeOfResidenceModel.findById(
          addBlockchainData.id
        )) as PlaceOfResidenceDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      const placeOfResidenceService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[1],
        decryptedPrivateKey,
        user.address,
        "1"
      );

      const names = placeOfResidence.placeOfResidenceInfos.map(
        (item) => item.name
      );
      const surnames = placeOfResidence.placeOfResidenceInfos.map(
        (item) => item.surname
      );
      const typeOfAddresses = placeOfResidence.placeOfResidenceInfos.map(
        (item) => item.typeOfAddress
      );
      const locationOfAddresses = placeOfResidence.placeOfResidenceInfos.map(
        (item) => item.locationOfAddress
      );
      const isCurrentAddresses = placeOfResidence.placeOfResidenceInfos.map(
        (item) => item.isCurrentAddress
      );
      const settlementDates = placeOfResidence.placeOfResidenceInfos.map(
        (item) => new Date(item.settlementDate).getTime()
      );
      const leavingDates = placeOfResidence.placeOfResidenceInfos.map((item) =>
        new Date(item.leavingDate).getTime()
      );

      await placeOfResidenceService.setPlaceOfResidenceRecord(
        user.address,
        user.uniqueID,
        names,
        surnames,
        typeOfAddresses,
        locationOfAddresses,
        isCurrentAddresses,
        settlementDates,
        leavingDates,
        addBlockchainData.ipfsHash
      );

      placeOfResidence.ipfsHash = await addBlockchainData.ipfsHash;
      await placeOfResidence.save();

      const newPlaceOfResidence: PlaceOfResidenceDocument =
        (await placeOfResidenceModel.findById(
          placeOfResidence._id
        )) as PlaceOfResidenceDocument;

      return res.status(200).json({
        message: "Place of Residence successfully added to blockchain",
        eb: newPlaceOfResidence,
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
