const jsonCreator = (data: any) => {
  const jsonString = JSON.stringify(data, null, 2);

  const blob = new Blob([jsonString], {
    type: "application/json",
  });

  const url = window.URL.createObjectURL(blob);

  return url;
};

export const createJSONFileForEducation = () => {
  let newData = [
    {
      Degree: "Bachelor degree",
      "School Name": "Near East University",
      "Started Year": "2021",
      "Graduation Year": "2024",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForHospital = () => {
  let newData = [
    {
      "Hospital Name": "Near East Hospital",
      "Doctor Name": "John Doe",
      Name: "Kamilcan Çelik",
      Symptoms: "xxxx",
      "Diagnostic Methods": "yyyy",
      "Treatment Options": "zzzz",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForBank = () => {
  let newData = [
    {
      "Bank Name": "Near East Bank",
      "Account Balance": "1212",
      "Account Number": "12341231231",
      "Account Type": "Normal",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForCriminalRecord = () => {
  let newData = [
    {
      "Case Number": "123",
      Court: "asda",
      Prosecutor: "asd",
      Defendant: "fsdfs",
      "Incident Date": "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Trial Date": "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Trial Outcome": "sdfsf",
      Evidence: "asdasd",
      Lawyers: "dfsdf",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForNotary = () => {
  let newData = [
    {
      Title: "title",
      Description: "asda",
      "Notary Name": "asd",
      "Type of Document": "fsdfs",
      "Parties Involved": "dfsdf",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForTaxDebt = () => {
  let newData = [
    {
      Taxpayer: "John Doe",
      "Debt Amount": "13123",
      "Expiry Date": "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Type of Tax": "fsdfs",
      "Is Paid": false,
      "Payment Date": "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Payment Amount": "5454",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForAsset = () => {
  let newData = [
    {
      Name: "John Doe",
      "Type of Asset": "13123",
      Description: "sfsdfsdfs",
      Location: "Istanbul",
      "Purchase Date": "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Purchase Price": "2323232",
      "Previous Owner": "Jack Doe",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForMilitary = () => {
  let newData = [
    {
      Name: "John Doe",
      "Date of Birth": "Sat Jan 06 2001 19:18:19 GMT+0200 (GMT+02:00)",
      "State of Military": "Postponed",
      "Postponement Date": "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Date of Construction": "",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForFamilyTree = () => {
  let newData = [
    {
      "Sequence Number": "1",
      Gender: "Male",
      "Degree of Relationship": "Dad",
      Name: "John",
      Surname: "Doe",
      "Father's Name": "Jack",
      "Mother's Name": "Mary",
      "Place of Birth": "USA",
      "Date of Birth": "Sat Jan 06 2001 19:18:19 GMT+0200 (GMT+02:00)",
      "City District Neighbourhood/Village": "Florida",
      "Marital Status": "Married",
      Status: "Live",
      "Date of Death": "",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};

export const createJSONFileForSubscriptionTransaction = () => {
  let newData = [
    {
      "Subscription Type": "YouTube Premium",
      "Company's Name": "YouTube",
      "Subscription Start Date": "2/2/2021",
      "Subscription End Date": "2/2/2024",
      "Subscriber Name": "John",
      "Subscriber Surname": "Doe",
    },
  ];

  const url = jsonCreator(newData);

  return { url };
};
