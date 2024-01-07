import { NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types/next';

import validateResource from '@/server/middlewares/validateResource';
import { checkJwtAndUserExist } from '@/server/middlewares/jwt';

import { AddBlockChainByAdminType } from '@/types/TaxDebt';
import { addBlockChainByAdminSchema } from '@/server/schemas/taxDebtSchema';
import taxDebtModel, { TaxDebtDocument } from '@/server/models/taxDebtModel';
import { get } from 'lodash';
import SmartContractModel, {
  SmartContractDocument,
} from '@/server/models/smartContractModel';
import UserModel, { UserDocument } from '@/server/models/userModel';
import UserService from '@/server/services/UserService';
import Web3Service from '@/server/services/Web3Service';
import { openMongooseConnection } from '@/server/middlewares/openDBConnection';
import CustomError from '@/server/errors/CustomError';
import AdminModel, { AdminDocument } from '@/server/models/adminModel';
import AdminDAO from '@/server/data/AdminDAO';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const addBlockchainData: AddBlockChainByAdminType = req.body;

      const admin: AdminDocument = (await AdminModel.findById(
        get(req.user, '_id')
      )) as AdminDocument;

      const user: UserDocument = (await UserModel.findById(
        addBlockchainData.userId
      )) as UserDocument;

      if (!user.uniqueID)
        throw new CustomError(
          'Bad Request',
          'User does not have digital id',
          400
        );

      // TODO: user private key must be admin
      const decryptedPrivateKey =
        await UserService.decryptHashedWalletPrivateKey(user.privateKey ?? '');

      const taxDebt: TaxDebtDocument = (await taxDebtModel.findById(
        addBlockchainData.id
      )) as TaxDebtDocument;

      const smartContract: SmartContractDocument =
        (await SmartContractModel.findById(
          addBlockchainData.smartContract
        )) as SmartContractDocument;

      // TODO: user address must be admin
      const taxDebtService = new Web3Service(
        smartContract.network,
        smartContract.contractAddressOfUser[0],
        decryptedPrivateKey,
        user.address ?? ''
      );

      const taxpayers = taxDebt.taxDebtInfos.map((item) => item.taxpayer);
      const debtAmounts = taxDebt.taxDebtInfos.map((item) => item.debtAmount);
      const typeOfTaxs = taxDebt.taxDebtInfos.map((item) => item.typeOfTax);
      const isPaids = taxDebt.taxDebtInfos.map((item) => item.isPaid);
      const paymentAmounts = taxDebt.taxDebtInfos.map(
        (item) => item.paymentAmount
      );
      const expiryDates = taxDebt.taxDebtInfos.map((item) =>
        new Date(item.expiryDate).getTime()
      );
      const paymentDates = taxDebt.taxDebtInfos.map((item) =>
        new Date(item.paymentDate).getTime()
      );

      await taxDebtService.setTaxDebtRecord(
        user.address,
        user.uniqueID,
        taxpayers,
        debtAmounts,
        expiryDates,
        typeOfTaxs,
        isPaids,
        paymentDates,
        paymentAmounts,
        addBlockchainData.ipfsHash
      );

      taxDebt.ipfsHash = await addBlockchainData.ipfsHash;
      await taxDebt.save();

      const newTaxDebt: TaxDebtDocument = (await taxDebtModel.findById(
        taxDebt._id
      )) as TaxDebtDocument;

      return res.status(200).json({
        message: 'Tax Debt successfully added to blockchain',
        eb: newTaxDebt,
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
    return res.status(403).json({ message: 'You have not a permission' });
  }
}

export default openMongooseConnection(
  validateResource(
    checkJwtAndUserExist<typeof AdminDAO>(handler, AdminDAO),
    addBlockChainByAdminSchema
  )
);
