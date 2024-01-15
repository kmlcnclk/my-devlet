import UserContract from '../data/web3/userContract';

class Web3Service {
  private _userContract: UserContract;

  constructor(
    network: string,
    contractAddress: string,
    privateKey: string,
    account: string,
    whichContract: string
  ) {
    this._userContract = new UserContract(
      network,
      contractAddress,
      privateKey,
      account,
      whichContract
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
  }

  async getTaxDebtRecords(from: string, userId: string) {
    await this._userContract.getTaxDebtRecords(from, userId);
  }

  async setCriminalRecordRecord(
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
    await this._userContract.setCriminalRecordRecord(
      from,
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
  }

  async getCriminalRecordRecords(from: string, userId: string) {
    await this._userContract.getCriminalRecordRecords(from, userId);
  }

  async setAssetRecord(
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
    await this._userContract.setAssetRecord(
      from,
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
  }

  async getAssetRecords(from: string, userId: string) {
    await this._userContract.getAssetRecords(from, userId);
  }

  async setMilitaryRecord(
    from: string,
    userId: string,
    names: string[],
    dateOfBirths: number[],
    stateOfMilitarys: string[],
    postponementDates: number[],
    dateOfConstructions: number[],
    ipfsHash: string
  ): Promise<void> {
    await this._userContract.setMilitaryRecord(
      from,
      userId,
      names,
      dateOfBirths,
      stateOfMilitarys,
      postponementDates,
      dateOfConstructions,
      ipfsHash
    );
  }

  async getMilitaryRecords(from: string, userId: string) {
    await this._userContract.getMilitaryRecords(from, userId);
  }

  async setFamilyTreeRecord(
    from: string,
    userId: string,
    genders: string[],
    degreeOfRelationships: string[],
    names: string[],
    surnames: string[],
    fathersNames: string[],
    mothersNames: string[],
    dateOfBirths: number[],
    statuss: string[],
    dateOfDeaths: number[],
    ipfsHash: string
  ): Promise<void> {
    await this._userContract.setFamilyTreeRecord(
      from,
      userId,
      genders,
      degreeOfRelationships,
      names,
      surnames,
      fathersNames,
      mothersNames,
      dateOfBirths,
      statuss,
      dateOfDeaths,
      ipfsHash
    );
  }

  async getFamilyTreeRecords(from: string, userId: string) {
    await this._userContract.getFamilyTreeRecords(from, userId);
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
