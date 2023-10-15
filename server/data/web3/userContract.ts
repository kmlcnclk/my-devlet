import Web3, { EthExecutionAPI, SupportedProviders } from 'web3';
import erc721ContractArtifact from '../../contracts/UserContract.json';
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
    account: string
  ) {
    const currentNetwork = this.whichNetwork(network);

    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: process.env.NEXT_PUBLIC_MNEMONIC,
      },
      providerOrUrl: currentNetwork,
    }) as SupportedProviders<EthExecutionAPI>;

    this._web3 = new Web3(provider);

    this._contract = new this._web3.eth.Contract(
      erc721ContractArtifact.abi,
      contractAddress
    );

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
      console.log(Number(mintTx[0][3]));
      console.log(mintTx[0]['schoolName']);
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
      console.log(mintTx);
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
