import Web3, { EthExecutionAPI, SupportedProviders } from 'web3';
import userContractArtifact from '../../contracts/UserContract.json';
import userContractArtifact1 from '../../contracts/UserContract1.json';
import HDWalletProvider from '@truffle/hdwallet-provider';
import CustomError from '@/server/errors/CustomError';

export default class UserContract {
  private _web3: Web3;
  private _contract: any;
  private _contractAddress: string;
  private _privateKey: string;
  private _account: string;

  constructor(
    network: string,
    contractAddress: string,
    privateKey: string,
    account: string,
    whichContract: string
  ) {
    const currentNetwork = this.whichNetwork(network);

    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: process.env.NEXT_PUBLIC_MNEMONIC,
      },
      providerOrUrl: currentNetwork,
    }) as SupportedProviders<EthExecutionAPI>;

    this._web3 = new Web3(provider);

    if (whichContract === '0') {
      this._contract = new this._web3.eth.Contract(
        userContractArtifact.abi,
        contractAddress
      );
    } else if (whichContract === '1') {
      this._contract = new this._web3.eth.Contract(
        userContractArtifact1.abi,
        contractAddress
      );
    }

    this._contractAddress = contractAddress;
    this._privateKey = privateKey;
    this._account = account;
  }

  private whichNetwork(network: string) {
    switch (network.toLowerCase()) {
      case 'Binance Smart Chain':
        return process.env.INFURA_BSC_TESTNET_PROVIDER;
      case 'ethereum':
        return process.env.INFURA_ETHEREUM_TESTNET_PROVIDER;
      case 'polygon':
        return process.env.INFURA_POLYGON_TESTNET_PROVIDER;
      default:
        return process.env.INFURA_BSC_TESTNET_PROVIDER;
    }
  }

  public async setEducationRecord(
    from: string,
    userId: string,
    schoolNames: string[],
    degrees: string[],
    startedYears: number[],
    graduationYears: number[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = this._contract.methods.setEducationRecord(
        userId,
        schoolNames,
        degrees,
        startedYears,
        graduationYears,
        ipfsHash
      );

      const data = mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gas = await this._web3.eth.estimateGas(tx);
      const gasPrice = await this._web3.eth.getGasPrice();
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getEducationRecords(
    from: string,
    userId: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getEducationRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setBankRecord(
    from: string,
    userId: string,
    bankNames: string[],
    accountBalances: number[],
    accountNumbers: string[],
    accountTypes: string[],
    accountOpeningDates: number[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = this._contract.methods.setBankRecord(
        userId,
        bankNames,
        accountBalances,
        accountNumbers,
        accountTypes,
        accountOpeningDates,
        ipfsHash
      );
      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gas = await this._web3.eth.estimateGas(tx);
      const gasPrice = await this._web3.eth.getGasPrice();
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);
      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getBankRecords(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods.getBankRecords(userId).call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setHospitalRecord(
    from: string,
    userId: string,
    hospitalNames: string[],
    doctorNames: string[],
    names: string[],
    symptomss: string[],
    diagnosticMethodss: string[],
    dates: number[],
    treatmentOptionss: string[],
    importantInformations: string[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = this._contract.methods.setHospitalRecord(
        userId,
        hospitalNames,
        doctorNames,
        names,
        symptomss,
        diagnosticMethodss,
        dates,
        treatmentOptionss,
        importantInformations,
        ipfsHash
      );

      const data = mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gas = await this._web3.eth.estimateGas(tx);
      const gasPrice = await this._web3.eth.getGasPrice();
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getHospitalRecords(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getHospitalRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setNotaryRecord(
    from: string,
    userId: string,
    titles: string[],
    descriptions: string[],
    dates: number[],
    notaryNames: string[],
    typeOfDocuments: string[],
    partiesInvolveds: string[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods.setNotaryRecord(
        userId,
        titles,
        descriptions,
        dates,
        notaryNames,
        typeOfDocuments,
        partiesInvolveds,
        ipfsHash
      );

      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gasPrice = await this._web3.eth.getGasPrice();
      const gas = await this._web3.eth.estimateGas(tx);
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getNotaryRecords(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getNotaryRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }
  public async setTaxDebtRecord(
    from: string,
    userId: string,
    taxpayers: string[],
    debtAmounts: number[],
    expiryDates: number[],
    typeOfTaxs: string[],
    isPaids: boolean[],
    paymentDates: number[],
    paymentAmounts: number[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods.setTaxDebtRecord(
        userId,
        taxpayers,
        debtAmounts,
        expiryDates,
        typeOfTaxs,
        isPaids,
        paymentDates,
        paymentAmounts,
        ipfsHash
      );

      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gasPrice = await this._web3.eth.getGasPrice();
      const gas = await this._web3.eth.estimateGas(tx);
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getTaxDebtRecords(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getTaxDebtRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setCriminalRecordRecord(
    from: string,
    userId: string,
    caseNumbers: string[],
    courts: string[],
    prosecutors: string[],
    defendants: string[],
    incidentDates: number[],
    trialDates: number[],
    trialOutcomes: string[],
    evidences: string[],
    lawyerss: string[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods.setCriminalRecordRecord(
        userId,
        caseNumbers,
        courts,
        prosecutors,
        defendants,
        incidentDates,
        trialDates,
        trialOutcomes,
        evidences,
        lawyerss,
        ipfsHash
      );

      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gasPrice = await this._web3.eth.getGasPrice();
      const gas = await this._web3.eth.estimateGas(tx);
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getCriminalRecordRecords(
    from: string,
    userId: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getCriminalRecordRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setAssetRecord(
    from: string,
    userId: string,
    names: string[],
    typeOfAssets: string[],
    descriptions: string[],
    locations: string[],
    purchaseDates: number[],
    purchasePrices: number[],
    previousOwners: string[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods.setAssetRecord(
        userId,
        names,
        typeOfAssets,
        descriptions,
        locations,
        purchaseDates,
        purchasePrices,
        previousOwners,
        ipfsHash
      );

      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gasPrice = await this._web3.eth.getGasPrice();
      const gas = await this._web3.eth.estimateGas(tx);
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getAssetRecords(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getAssetRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setMilitaryRecord(
    from: string,
    userId: string,
    names: string[],
    dateOfBirths: number[],
    stateOfMilitarys: string[],
    postponementDates: number[],
    dateOfConstructions: number[],
    ipfsHash: string
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods.setMilitaryRecord(
        userId,
        names,
        dateOfBirths,
        stateOfMilitarys,
        postponementDates,
        dateOfConstructions,
        ipfsHash
      );

      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gasPrice = await this._web3.eth.getGasPrice();
      const gas = await this._web3.eth.estimateGas(tx);
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getMilitaryRecords(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods
        .getMilitaryRecords(userId)
        .call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async getUserData(from: string, userId: string): Promise<void> {
    try {
      const mintTx = await this._contract.methods.getUserData(userId).call();
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  public async setUserData(
    from: string,
    userId: string,
    userData: any
  ): Promise<void> {
    try {
      const mintTx = await this._contract.methods.setUserData(userId, userData);

      const data = await mintTx.encodeABI();

      const tx = {
        to: this._contractAddress,
        from: from,
        data: data,
      } as any;

      const gas = await this._web3.eth.estimateGas(tx);
      const gasPrice = await this._web3.eth.getGasPrice();
      const nonce = await this._web3.eth.getTransactionCount(from);

      tx.gas = this._web3.utils.toHex(gas);
      tx.gasPrice = this._web3.utils.toHex(gasPrice);
      tx.nonce = this._web3.utils.toHex(nonce);

      const signedTransaction = await this._web3.eth.accounts.signTransaction(
        tx,
        this._privateKey
      );

      await this._web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
    } catch (err: any) {
      if (err.error.message.indexOf('insufficient funds') != -1) {
        throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
      } else {
        throw new CustomError('Web3 JS Error', err.error.message, 500);
      }
    }
  }

  // public async safeTransferFrom(
  //   from: string,
  //   to: string,
  //   id: number,
  //   amount?: number,
  //   data?: string
  // ): Promise<void> {
  //   try {
  //     const transferTx = this._contract.methods.safeTransferFrom(from, to, id);

  //     const data = transferTx.encodeABI();

  //     const tx = {
  //       to: this._contractAddress,
  //       data: data,
  //     } as any;

  //     const gas = await this._web3.eth.estimateGas(tx);
  //     const gasPrice = await this._web3.eth.getGasPrice();
  //     const nonce = await this._web3.eth.getTransactionCount(from);

  //     tx.gas = this._web3.utils.toHex(gas);
  //     tx.gasPrice = this._web3.utils.toHex(gasPrice);
  //     tx.nonce = this._web3.utils.toHex(nonce);

  //     const signedTransaction = await this._web3.eth.accounts.signTransaction(
  //       tx,
  //       this._privateKey
  //     );

  //     await this._web3.eth.sendSignedTransaction(
  //       signedTransaction.rawTransaction
  //     );
  //   } catch (err: any) {
  //     if (err.error.message.indexOf('insufficient funds') != -1) {
  //       throw new CustomError('Web3 JS Error', 'Insufficient funds', 500);
  //     } else {
  //       throw new CustomError('Web3 JS Error', err.error.message, 500);
  //     }
  //   }
  // }
}
