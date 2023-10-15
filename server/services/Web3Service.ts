import UserContract from '../data/web3/userContract';

class Web3Service {
  private _userContract: UserContract;

  constructor(
    network: string,
    contractAddress: string,
    privateKey: string,
    account: string
  ) {
    this._userContract = new UserContract(
      network,
      contractAddress,
      privateKey,
      account
    );
  }

  async setEducationRecord(
    from: string,
    userId: string,
    schoolNames: string[],
    degrees: string[],
    startedYears: number[],
    graduationYears: number[],
    ipfsHash: string
  ): Promise<void> {
    await this._userContract.setEducationRecord(
      from,
      userId,
      schoolNames,
      degrees,
      startedYears,
      graduationYears,
      ipfsHash
    );
  }

  async getEducationRecords(from: string, userId: string) {
    await this._userContract.getEducationRecords(from, userId);
  }

  async setUserData(
    from: string,
    userId: string,
    setUserData: any
  ): Promise<void> {
    await this._userContract.setUserData(from, userId, setUserData);
  }
}

export default Web3Service;
