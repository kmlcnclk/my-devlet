export const readCSVFileForEducation = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Degree') {
          row.degree = values[j];
        } else if (headers[j] === 'School Name') {
          row.schoolName = values[j];
        } else if (headers[j] === 'Started Year') {
          row.startedYear = Number(values[j]);
        } else if (headers[j] === 'Graduation Year') {
          row.graduationYear = Number(values[j]);
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.degree?.trim() ||
        data?.schoolName?.trim() ||
        data?.startedYear?.trim() ||
        data?.graduationYear?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};

export const readCSVFileForHospital = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Hospital Name') {
          row.hospitalName = values[j];
        } else if (headers[j] === 'Doctor Name') {
          row.doctorName = values[j];
        } else if (headers[j] === 'Name') {
          row.name = values[j];
        } else if (headers[j] === 'Symptoms') {
          row.symptoms = values[j];
        } else if (headers[j] === 'Diagnostic Methods') {
          row.diagnosticMethods = values[j];
        } else if (headers[j] === 'Treatment Options') {
          row.treatmentOptions = values[j];
        } else if (headers[j] === 'Important Information') {
          row.importantInformation = values[j];
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.hospitalName?.trim() ||
        data?.doctorName?.trim() ||
        data?.name?.trim() ||
        data?.symptoms?.trim() ||
        data?.diagnosticMethods?.trim() ||
        data?.treatmentOptions?.trim() ||
        data?.importantInformation?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};

export const readCSVFileForBank = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Bank Name') {
          row.bankName = values[j];
        } else if (headers[j] === 'Account Balance') {
          row.accountBalance = Number(values[j]);
        } else if (headers[j] === 'Account Number') {
          row.accountNumber = values[j];
        } else if (headers[j] === 'Account Type') {
          row.accountType = values[j];
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.bankName?.trim() ||
        data?.accountBalance?.trim() ||
        data?.accountNumber?.trim() ||
        data?.accountType?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};

export const readCSVFileForCriminalRecord = (
  file: any,
  setFileData: Function
) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Case Number') {
          row.caseNumber = values[j];
        } else if (headers[j] === 'Court') {
          row.court = values[j];
        } else if (headers[j] === 'Prosecutor') {
          row.prosecutor = values[j];
        } else if (headers[j] === 'Defendant') {
          row.defendant = values[j];
        } else if (headers[j] === 'Incident Date') {
          row.incidentDate = values[j];
        } else if (headers[j] === 'Trial Date') {
          row.trialDate = values[j];
        } else if (headers[j] === 'Trial Outcome') {
          row.trialOutcome = values[j];
        } else if (headers[j] === 'Evidence') {
          row.evidence = values[j];
        } else if (headers[j] === 'Lawyers') {
          row.lawyers = values[j];
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.caseNumber?.trim() ||
        data?.court?.trim() ||
        data?.prosecutor?.trim() ||
        data?.defendant?.trim() ||
        data?.incidentDate?.trim() ||
        data?.trialDate?.trim() ||
        data?.trialOutcome?.trim() ||
        data?.evidence?.trim() ||
        data?.lawyers?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};

export const readCSVFileForNotary = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Title') {
          row.title = values[j];
        } else if (headers[j] === 'Description') {
          row.description = values[j];
        } else if (headers[j] === 'Notary Name') {
          row.notaryName = values[j];
        } else if (headers[j] === 'Type of Document') {
          row.typeOfDocument = values[j];
        } else if (headers[j] === 'Parties Involved') {
          row.partiesInvolved = values[j];
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.title?.trim() ||
        data?.description?.trim() ||
        data?.notaryName?.trim() ||
        data?.typeOfDocument?.trim() ||
        data?.partiesInvolved?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};

export const readCSVFileForTaxDebt = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Taxpayer') {
          row.taxpayer = values[j];
        } else if (headers[j] === 'Debt Amount') {
          row.debtAmount = Number(values[j]);
        } else if (headers[j] === 'Expiry Date') {
          row.expiryDate = values[j];
        } else if (headers[j] === 'Type of Tax') {
          row.typeOfTax = values[j];
        } else if (headers[j] === 'Is Paid') {
          row.isPaid = Boolean(values[j]);
        } else if (headers[j] === 'Payment Date') {
          row.paymentDate = values[j];
        } else if (headers[j] === 'Payment Amount') {
          row.paymentAmount = Number(values[j]);
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.taxpayer?.trim() ||
        data?.debtAmount?.trim() ||
        data?.expiryDate?.trim() ||
        data?.typeOfTax?.trim() ||
        data?.isPaid?.trim() ||
        data?.paymentDate?.trim() ||
        data?.paymentAmount?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};

export const readCSVFileForAsset = (file: any, setFileData: Function) => {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const content = e.target.result;
    const newED = parseCSV(content);

    setFileData((prev: any) => {
      if (prev.length > 0) {
        const updatedPrev = [...prev, ...newED];
        return updatedPrev;
      }
      return newED;
    });
  };

  const parseCSV = (csvString: any) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const extractedData = [];
    for (let i = 1; i < lines.length; i++) {
      const row: any = {};
      const values = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === 'Name') {
          row.name = values[j];
        } else if (headers[j] === 'Type of Asset') {
          row.typeOfAsset = values[j];
        } else if (headers[j] === 'Description') {
          row.description = values[j];
        } else if (headers[j] === 'Location') {
          row.location = values[j];
        } else if (headers[j] === 'Purchase Date') {
          row.purchaseDate = values[j];
        } else if (headers[j] === 'Purchase Price') {
          row.purchasePrice = Number(values[j]);
        } else if (headers[j] === 'Previous Owner') {
          row.previousOwner = values[j];
        }
      }
      extractedData.push(row);
    }

    const newED = extractedData.filter((data: any) => {
      if (
        data?.name?.trim() ||
        data?.typeOfAsset?.trim() ||
        data?.description?.trim() ||
        data?.location?.trim() ||
        data?.purchaseDate?.trim() ||
        data?.purchasePrice?.trim() ||
        data?.previousOwner?.trim()
      ) {
        return data;
      }
    });

    return newED;
  };

  reader.readAsText(file as any);
};
