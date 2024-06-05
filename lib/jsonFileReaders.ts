export const readJSONFileForEducation = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      degree: item.Degree?.toString(),
      schoolName: item["School Name"]?.toString(),
      startedYear: Number(item["Started Year"]?.toString()),
      graduationYear: Number(item["Graduation Year"]?.toString()),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.degree ||
        data.schoolName ||
        data.startedYear ||
        data.graduationYear
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForHospital = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      hospitalName: item["Hospital Name"]?.toString(),
      doctorName: item["Doctor Name"]?.toString(),
      name: item["Name"]?.toString(),
      symptoms: item["Symptoms"]?.toString(),
      diagnosticMethods: item["Diagnostic Methods"]?.toString(),
      treatmentOptions: item["Treatment Options"]?.toString(),
      importantInformation: item["Important Information"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.hospitalName ||
        data.doctorName ||
        data.name ||
        data.symptoms ||
        data.diagnosticMethods ||
        data.treatmentOptions ||
        data.importantInformation
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForBank = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      bankName: item["Bank Name"]?.toString(),
      accountBalance: Number(item["Account Balance"]?.toString()),
      accountNumber: item["Account Number"]?.toString(),
      accountType: item["Account Type"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.bankName ||
        data.accountBalance ||
        data.accountNumber ||
        data.accountType
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForCriminalRecord = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      caseNumber: item["Case Number"]?.toString(),
      court: item["Court"]?.toString(),
      prosecutor: item["Prosecutor"]?.toString(),
      defendant: item["Defendant"]?.toString(),
      incidentDate: item["Incident Date"]?.toString(),
      trialDate: item["Trial Date"]?.toString(),
      trialOutcome: item["Trial Outcome"]?.toString(),
      evidence: item["Evidence"]?.toString(),
      lawyers: item["Lawyers"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.caseNumber ||
        data.court ||
        data.prosecutor ||
        data.defendant ||
        data.incidentDate ||
        data.trialDate ||
        data.trialOutcome ||
        data.evidence ||
        data.lawyers
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForNotary = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      title: item["Title"]?.toString(),
      description: item["Description"]?.toString(),
      notaryName: item["Notary Name"]?.toString(),
      typeOfDocument: item["Type of Document"]?.toString(),
      partiesInvolved: item["Parties Involved"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.title ||
        data.description ||
        data.notaryName ||
        data.typeOfDocument ||
        data.partiesInvolved
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForTaxDebt = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      taxpayer: item["Taxpayer"]?.toString(),
      debtAmount: Number(item["Debt Amount"]?.toString()),
      expiryDate: item["Expiry Date"]?.toString(),
      typeOfTax: item["Type of Tax"]?.toString(),
      isPaid: Boolean(item["Is Paid"]?.toString()),
      paymentDate: item["Payment Date"]?.toString(),
      paymentAmount: Number(item["Payment Amount"]?.toString()),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.taxpayer ||
        data.debtAmount ||
        data.expiryDate ||
        data.typeOfTax ||
        data.isPaid ||
        data.paymentDate ||
        data.paymentAmount
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForAsset = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      name: item["Name"]?.toString(),
      typeOfAsset: item["Type of Asset"]?.toString(),
      description: item["Description"]?.toString(),
      location: item["Location"]?.toString(),
      purchaseDate: item["Purchase Date"]?.toString(),
      purchasePrice: Number(item["Purchase Price"]?.toString()),
      previousOwner: item["Previous Owner"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.name ||
        data.typeOfAsset ||
        data.description ||
        data.location ||
        data.purchaseDate ||
        data.purchasePrice ||
        data.previousOwner
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForMilitary = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      name: item["Name"]?.toString(),
      dateOfBirth: item["Date of Birth"]?.toString(),
      stateOfMilitary: item["State of Military"]?.toString(),
      postponementDate: item["Postponement Date"]?.toString(),
      dateOfConstruction: item["Date of Construction"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.name ||
        data.dateOfBirth ||
        data.stateOfMilitary ||
        data.postponementDate ||
        data.dateOfConstruction
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForFamilyTree = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      sequenceNumber: item["Sequence Number"]?.toString(),
      gender: item["Gender"]?.toString(),
      degreeOfRelationship: item["Degree of Relationship"]?.toString(),
      name: item["Name"]?.toString(),
      surname: item["Surname"]?.toString(),
      fathersName: item["Father's Name"]?.toString(),
      mothersName: item["Mother's Name"]?.toString(),
      placeOfBirth: item["Place of Birth"]?.toString(),
      dateOfBirth: item["Date of Birth"]?.toString(),
      cityDistrictNeighbourhoodVillage:
        item["City District Neighbourhood/Village"]?.toString(),
      maritalStatus: item["Marital Status"]?.toString(),
      status: item["Status"]?.toString(),
      dateOfDeath: item["Date of Death"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.sequenceNumber ||
        data.gender ||
        data.degreeOfRelationship ||
        data.name ||
        data.surname ||
        data.fathersName ||
        data.mothersName ||
        data.placeOfBirth ||
        data.dateOfBirth ||
        data.cityDistrictNeighbourhoodVillage ||
        data.maritalStatus ||
        data.status ||
        data.dateOfDeath
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForSubscriptionTransaction = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      subscriptionType: item["Subscription Type"]?.toString(),
      companyName: item["Company's Name"]?.toString(),
      subscriptionStartDate: item["Subscription Start Date"]?.toString(),
      subscriptionEndDate: item["Subscription End Date"]?.toString(),
      subscriberName: item["Subscriber Name"]?.toString(),
      subscriberSurname: item["Subscriber Surname"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.subscriptionType ||
        data.companyName ||
        data.subscriptionStartDate ||
        data.subscriptionEndDate ||
        data.subscriberName ||
        data.subscriberSurname
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForTrafficDebt = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      debtPayer: item["Debt Payer"]?.toString(),
      debtAmount: Number(item["Debt Amount"]?.toString()),
      expiryDate: item["Expiry Date"]?.toString(),
      licensePlate: item["License Plate"]?.toString(),
      isPaid: Boolean(item["Is Paid"]?.toString()),
      paymentDate: item["Payment Date"]?.toString(),
      paymentAmount: Number(item["Payment Amount"]?.toString()),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.debtPayer ||
        data.debtAmount ||
        data.expiryDate ||
        data.licensePlate ||
        data.isPaid ||
        data.paymentDate ||
        data.paymentAmount
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};

export const readJSONFileForPlaceOfResidence = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const jsonData = JSON.parse(content);
    const extractedData = jsonData.map((item: any) => ({
      name: item["Name"]?.toString(),
      surname: item["Surname"]?.toString(),
      typeOfAddress: item["Type of Address"]?.toString(),
      locationOfAddress: item["Location of Address"]?.toString(),
      isCurrentAddress: Boolean(item["Is Current Address"]?.toString()),
      settlementDate: item["Settlement Date"]?.toString(),
      leavingDate: item["Leaving Date"]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data.name ||
        data.surname ||
        data.typeOfAddress ||
        data.locationOfAddress ||
        data.isCurrentAddress ||
        data.settlementDate ||
        data.leavingDate
      ) {
        return data;
      }
    });

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  reader.readAsText(file as any);
};
