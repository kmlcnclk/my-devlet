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
    try {
      await this._userContract.setEducationRecord(
        from,
        userId,
        schoolNames,
        degrees,
        startedYears,
        graduationYears,
        ipfsHash
      );
    } catch (err: any) {
      console.log(err);
    }
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
    try {
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
    } catch (err: any) {
      console.log(err);
    }
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
    try {
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
    } catch (err: any) {
      console.log(err);
    }
  }

  async getHospitalRecords(from: string, userId: string) {
    await this._userContract.getHospitalRecords(from, userId);
  }

  async setNotaryRecord(
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
      await this._userContract.setNotaryRecord(
        from,
        userId,
        titles,
        descriptions,
        dates,
        notaryNames,
        typeOfDocuments,
        partiesInvolveds,
        ipfsHash
      );
    } catch (err: any) {
      console.log(err);
    }
  }

  async getNotaryRecords(from: string, userId: string) {
    await this._userContract.getNotaryRecords(from, userId);
  }

  async setTaxDebtRecord(
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
      await this._userContract.setTaxDebtRecord(
        from,
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
    } catch (err: any) {
      console.log(err);
    }
  }

  async getTaxDebtRecords(from: string, userId: string) {
    await this._userContract.getTaxDebtRecords(from, userId);
  }

  async setUserData(
    from: string,
    userId: string,
    setUserData: any
  ): Promise<void> {
    try {
      await this._userContract.setUserData(from, userId, setUserData);
    } catch (err: any) {
      console.log(err);
    }
  }
}

export default Web3Service;
