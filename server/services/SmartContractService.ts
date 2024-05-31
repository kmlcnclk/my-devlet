import smartContractModel from "../models/smartContractModel";
import Web3, { EthExecutionAPI, SupportedProviders } from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import userContractArtifact from "../contracts/UserContract.json";
import userContractArtifact1 from "../contracts/UserContract1.json";
import CustomError from "../errors/CustomError";

class SmartContractService {
  constructor() {}

  async getSmartContractWithID(id: string) {
    const smartContract = await smartContractModel.find({ _id: id }).populate({
      path: "userId",
      select: "name",
    });
    return smartContract;
  }

  private whichNetwork(network: string) {
    switch (network.toLowerCase()) {
      case "Binance Smart Chain":
        return process.env.INFURA_BSC_PROVIDER;
      case "Binance Smart Chain Testnet":
        return process.env.INFURA_BSC_TESTNET_PROVIDER;
      case "ethereum":
        return process.env.INFURA_ETHEREUM_PROVIDER;
      case "sepolia":
        return process.env.INFURA_ETHEREUM_TESTNET_PROVIDER;
      case "polygon":
        return process.env.INFURA_POLYGON_TESTNET_PROVIDER;
      default:
        return process.env.INFURA_BSC_TESTNET_PROVIDER;
    }
  }

  async deployUserContract(
    userAddress: string,
    userPrivateKey: string,
    network: string
  ) {
    try {
      const currentNetwork = this.whichNetwork(network);

      const provider = new HDWalletProvider({
        mnemonic: {
          phrase: process.env.NEXT_PUBLIC_MNEMONIC,
        },
        providerOrUrl: currentNetwork,
      }) as SupportedProviders<EthExecutionAPI>;

      const web3 = new Web3(provider);

      const Contract = new web3.eth.Contract(userContractArtifact.abi);

      const deploy = await Contract.deploy({
        data: userContractArtifact.bytecode,
      });

      const transactionObject = {
        data: deploy.encodeABI(),
        from: userAddress,
      } as any;

      const gas = await web3.eth.estimateGas(transactionObject);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(userAddress);

      transactionObject.gas = gas;
      transactionObject.gasPrice = gasPrice;
      transactionObject.nonce = nonce;

      const createTransaction = await web3.eth.accounts.signTransaction(
        transactionObject,
        userPrivateKey
      );

      const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );

      return createReceipt.contractAddress as string;
    } catch (err: any) {
      if (err.error.message.indexOf("insufficient funds") != -1)
        throw new CustomError("Web3 JS Error", "Insufficient funds", 500);
      else if (err.error.message.indexOf("gas less than"))
        throw new CustomError(
          "Web3 JS Error",
          "Gas is not enough for process",
          500
        );
      else throw new CustomError("Web3 JS Error", err.error.message, 500);
    }
  }

  async deployUserContract1(
    userAddress: string,
    userPrivateKey: string,
    network: string
  ) {
    try {
      const currentNetwork = this.whichNetwork(network);

      const provider = new HDWalletProvider({
        mnemonic: {
          phrase: process.env.NEXT_PUBLIC_MNEMONIC,
        },
        providerOrUrl: currentNetwork,
      }) as SupportedProviders<EthExecutionAPI>;

      const web3 = new Web3(provider);

      const Contract = new web3.eth.Contract(userContractArtifact1.abi);

      const deploy = await Contract.deploy({
        data: userContractArtifact1.bytecode,
      });

      const transactionObject = {
        data: deploy.encodeABI(),
        from: userAddress,
      } as any;

      const gas = await web3.eth.estimateGas(transactionObject);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(userAddress);

      transactionObject.gas = gas;
      transactionObject.gasPrice = gasPrice;
      transactionObject.nonce = nonce;

      const createTransaction = await web3.eth.accounts.signTransaction(
        transactionObject,
        userPrivateKey
      );

      const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );

      return createReceipt.contractAddress as string;
    } catch (err: any) {
      if (err.error.message.indexOf("insufficient funds") != -1)
        throw new CustomError("Web3 JS Error", "Insufficient funds", 500);
      else if (err.error.message.indexOf("gas less than"))
        throw new CustomError(
          "Web3 JS Error",
          "Gas is not enough for process",
          500
        );
      else throw new CustomError("Web3 JS Error", err.error.message, 500);
    }
  }
}

export default new SmartContractService();
