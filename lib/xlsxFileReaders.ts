import * as XLSX from "xlsx";

export const readXLSXFileForEducation = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      degree: row[headers.indexOf("Degree")]?.toString(),
      schoolName: row[headers.indexOf("School Name")]?.toString(),
      startedYear: Number(row[headers.indexOf("Started Year")]?.toString()),
      graduationYear: Number(
        row[headers.indexOf("Graduation Year")]?.toString()
      ),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.degree?.toString().trim() ||
        data?.schoolName?.toString().trim() ||
        data?.startedYear?.toString().trim() ||
        data?.graduationYear?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForHospital = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      hospitalName: row[headers.indexOf("Hospital Name")]?.toString(),
      doctorName: row[headers.indexOf("Doctor Name")]?.toString(),
      name: row[headers.indexOf("Name")]?.toString(),
      symptoms: row[headers.indexOf("Symptoms")]?.toString(),
      diagnosticMethods: row[headers.indexOf("Diagnostic Methods")]?.toString(),
      treatmentOptions: row[headers.indexOf("Treatment Options")]?.toString(),
      importantInformation:
        row[headers.indexOf("Important Information")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.hospitalName?.toString().trim() ||
        data?.doctorName?.toString().trim() ||
        data?.name?.toString().trim() ||
        data?.symptoms?.toString().trim() ||
        data?.diagnosticMethods?.toString().trim() ||
        data?.treatmentOptions?.toString().trim() ||
        data?.importantInformation?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForBank = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      bankName: row[headers.indexOf("Bank Name")]?.toString(),
      accountBalance: Number(
        row[headers.indexOf("Account Balance")]?.toString()
      ),
      accountNumber: row[headers.indexOf("Account Number")]?.toString(),
      accountType: row[headers.indexOf("Account Type")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.bankName?.toString().trim() ||
        data?.accountBalance?.toString().trim() ||
        data?.accountNumber?.toString().trim() ||
        data?.accountType?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForCriminalRecord = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      caseNumber: row[headers.indexOf("Case Number")]?.toString(),
      court: row[headers.indexOf("Court")]?.toString(),
      prosecutor: row[headers.indexOf("Prosecutor")]?.toString(),
      defendant: row[headers.indexOf("Defendant")]?.toString(),
      incidentDate: row[headers.indexOf("Incident Date")]?.toString(),
      trialDate: row[headers.indexOf("Trial Date")]?.toString(),
      trialOutcome: row[headers.indexOf("Trial Outcome")]?.toString(),
      evidence: row[headers.indexOf("Evidence")]?.toString(),
      lawyers: row[headers.indexOf("Lawyers")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.caseNumber?.toString().trim() ||
        data?.court?.toString().trim() ||
        data?.prosecutor?.toString().trim() ||
        data?.defendant?.toString().trim() ||
        data?.incidentDate?.toString().trim() ||
        data?.trialDate?.toString().trim() ||
        data?.trialOutcome?.toString().trim() ||
        data?.evidence?.toString().trim() ||
        data?.lawyers?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForNotary = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      title: row[headers.indexOf("Title")]?.toString(),
      description: row[headers.indexOf("Description")]?.toString(),
      notaryName: row[headers.indexOf("Notary Name")]?.toString(),
      typeOfDocument: row[headers.indexOf("Type of Document")]?.toString(),
      partiesInvolved: row[headers.indexOf("Parties Involved")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.title?.toString().trim() ||
        data?.description?.toString().trim() ||
        data?.notaryName?.toString().trim() ||
        data?.typeOfDocument?.toString().trim() ||
        data?.partiesInvolved?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForTaxDebt = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      taxpayer: row[headers.indexOf("Taxpayer")]?.toString(),
      debtAmount: Number(row[headers.indexOf("Debt Amount")]?.toString()),
      expiryDate: row[headers.indexOf("Expiry Date")]?.toString(),
      typeOfTax: row[headers.indexOf("Type of Tax")]?.toString(),
      isPaid: Boolean(row[headers.indexOf("Is Paid")]?.toString()),
      paymentDate: row[headers.indexOf("Payment Date")]?.toString(),
      paymentAmount: Number(row[headers.indexOf("Payment Amount")]?.toString()),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.taxpayer?.toString().trim() ||
        data?.debtAmount?.toString().trim() ||
        data?.expiryDate?.toString().trim() ||
        data?.typeOfTax?.toString().trim() ||
        data?.isPaid?.toString().trim() ||
        data?.paymentDate?.toString().trim() ||
        data?.paymentAmount?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForAsset = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      name: row[headers.indexOf("Name")]?.toString(),
      typeOfAsset: row[headers.indexOf("Type of Asset")]?.toString(),
      description: row[headers.indexOf("Description")]?.toString(),
      location: row[headers.indexOf("Location")]?.toString(),
      purchaseDate: row[headers.indexOf("Purchase Date")]?.toString(),
      purchasePrice: Number(row[headers.indexOf("Purchase Price")]?.toString()),
      previousOwner: row[headers.indexOf("Previous Owner")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.name?.toString().trim() ||
        data?.typeOfAsset?.toString().trim() ||
        data?.description?.toString().trim() ||
        data?.location?.toString().trim() ||
        data?.purchaseDate?.toString().trim() ||
        data?.purchasePrice?.toString().trim() ||
        data?.previousOwner?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForMilitary = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      name: row[headers.indexOf("Name")]?.toString(),
      dateOfBirth: row[headers.indexOf("Date of Birth")]?.toString(),
      stateOfMilitary: row[headers.indexOf("State of Military")]?.toString(),
      postponementDate: row[headers.indexOf("Postponement Date")]?.toString(),
      dateOfConstruction:
        row[headers.indexOf("Date of Construction")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.name?.toString().trim() ||
        data?.dateOfBirth?.toString().trim() ||
        data?.stateOfMilitary?.toString().trim() ||
        data?.postponementDate?.toString().trim() ||
        data?.dateOfConstruction?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForFamilyTree = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      sequenceNumber: row[headers.indexOf("Sequence Number")]?.toString(),
      gender: row[headers.indexOf("Gender")]?.toString(),
      degreeOfRelationship:
        row[headers.indexOf("Degree of Relationship")]?.toString(),
      name: row[headers.indexOf("Name")]?.toString(),
      surname: row[headers.indexOf("Surname")]?.toString(),
      fathersName: row[headers.indexOf("Father's Name")]?.toString(),
      mothersName: row[headers.indexOf("Mother's Name")]?.toString(),
      placeOfBirth: row[headers.indexOf("Place of Birth")]?.toString(),
      dateOfBirth: row[headers.indexOf("Date of Birth")]?.toString(),
      cityDistrictNeighbourhoodVillage:
        row[headers.indexOf("City District Neighbourhood/Village")]?.toString(),
      maritalStatus: row[headers.indexOf("Marital Status")]?.toString(),
      status: row[headers.indexOf("Status")]?.toString(),
      dateOfDeath: row[headers.indexOf("Date of Death")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.sequenceNumber?.toString().trim() ||
        data?.gender?.toString().trim() ||
        data?.degreeOfRelationship?.toString().trim() ||
        data?.name?.toString().trim() ||
        data?.surname?.toString().trim() ||
        data?.fathersName?.toString().trim() ||
        data?.mothersName?.toString().trim() ||
        data?.placeOfBirth?.toString().trim() ||
        data?.dateOfBirth?.toString().trim() ||
        data?.cityDistrictNeighbourhoodVillage?.toString().trim() ||
        data?.maritalStatus?.toString().trim() ||
        data?.status?.toString().trim() ||
        data?.dateOfDeath?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForSubscriptionTransaction = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      subscriptionType: row[headers.indexOf("Subscription Type")]?.toString(),
      companyName: row[headers.indexOf("Company's Name")]?.toString(),
      subscriptionStartDate:
        row[headers.indexOf("Subscription Start Date")]?.toString(),
      subscriptionEndDate:
        row[headers.indexOf("Subscription End Date")]?.toString(),
      subscriberName: row[headers.indexOf("Subscriber Name")]?.toString(),
      subscriberSurname: row[headers.indexOf("Subscriber Surname")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.subscriptionType?.toString().trim() ||
        data?.companyName?.toString().trim() ||
        data?.subscriptionStartDate?.toString().trim() ||
        data?.subscriptionEndDate?.toString().trim() ||
        data?.subscriberName?.toString().trim() ||
        data?.subscriberSurname?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForTrafficDebt = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      debtPayer: row[headers.indexOf("Debt Payer")]?.toString(),
      debtAmount: Number(row[headers.indexOf("Debt Amount")]?.toString()),
      expiryDate: row[headers.indexOf("Expiry Date")]?.toString(),
      licensePlate: row[headers.indexOf("License Plate")]?.toString(),
      isPaid: Boolean(row[headers.indexOf("Is Paid")]?.toString()),
      paymentDate: row[headers.indexOf("Payment Date")]?.toString(),
      paymentAmount: Number(row[headers.indexOf("Payment Amount")]?.toString()),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.debtPayer?.toString().trim() ||
        data?.debtAmount?.toString().trim() ||
        data?.expiryDate?.toString().trim() ||
        data?.licensePlate?.toString().trim() ||
        data?.isPaid?.toString().trim() ||
        data?.paymentDate?.toString().trim() ||
        data?.paymentAmount?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};

export const readXLSXFileForPlaceOfResidence = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: "binary" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers: any = data[0];

    const extractedData = data.slice(1).map((row: any) => ({
      name: row[headers.indexOf("Name")]?.toString(),
      surname: row[headers.indexOf("Surname")]?.toString(),
      typeOfAddress: row[headers.indexOf("Type of Address")]?.toString(),
      locationOfAddress:
        row[headers.indexOf("Location of Address")]?.toString(),
      isCurrentAddress: Boolean(
        row[headers.indexOf("Is Current Address")]?.toString()
      ),
      settlementDate: row[headers.indexOf("Settlement Date")]?.toString(),
      leavingDate: row[headers.indexOf("Leaving Date")]?.toString(),
    }));

    const newED = extractedData.filter((data: any) => {
      if (
        data?.name?.toString().trim() ||
        data?.surname?.toString().trim() ||
        data?.typeOfAddress?.toString().trim() ||
        data?.locationOfAddress?.toString().trim() ||
        data?.isCurrentAddress?.toString().trim() ||
        data?.settlementDate?.toString().trim() ||
        data?.leavingDate?.toString().trim()
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

  reader.readAsBinaryString(file as any);
};
