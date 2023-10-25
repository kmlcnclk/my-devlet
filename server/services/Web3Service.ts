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

  async setBankRecord(
    from: string,
    userId: string,
    bankNames: string[],
    accountBalances: number[],
    accountNumbers: string[],
    accountTypes: string[],
    accountOpeningDates: number[],
    ipfsHash: string
  ): Promise<void> {
    await this._userContract.setBankRecord(
      from,
      userId,
      bankNames,
      accountBalances,
      accountNumbers,
      accountTypes,
      accountOpeningDates,
      ipfsHash
    );
  }

  async getBankRecords(from: string, userId: string) {
    await this._userContract.getBankRecords(from, userId);
  }

  async setHospitalRecord(
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
    await this._userContract.setHospitalRecord(
      from,
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
  }

  async getHospitalRecords(from: string, userId: string) {
    await this._userContract.getHospitalRecords(from, userId);
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
