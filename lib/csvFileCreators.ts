const csvCreator = (data: any) => {
  const csvContent = data.map((row: any) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  return url;
};

export const createCSVFileForEducation = () => {
  let newData = [
    ["Degree", "School Name", "Started Year", "Graduation Year"],
    ["Bachelor degree", "Near East University", "2021", "2024"],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForHospital = () => {
  let newData = [
    [
      "Hospital Name",
      "Doctor Name",
      "Name",
      "Symptoms",
      "Diagnostic Methods",
      "Treatment Options",
    ],
    [
      "Near East Hospital",
      "John Doe",
      "Kamilcan Çelik",
      "xxxx",
      "yyyy",
      "zzzz",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForBank = () => {
  let newData = [
    ["Bank Name", "Account Balance", "Account Number", "Account Type"],
    ["Near East Bacnk", "1212", "12341231231", "Normal"],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForCriminalRecord = () => {
  let newData = [
    [
      "Case Number",
      "Court",
      "Prosecutor",
      "Defendant",
      "Incident Date",
      "Trial Date",
      "Trial Outcome",
      "Evidence",
      "Lawyers",
    ],
    [
      "123",
      "asda",
      "asd",
      "fsdfs",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "sdfsf",
      "asdasd",
      "dfsdf",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForNotary = () => {
  let newData = [
    [
      "Title",
      "Description",
      "Notary Name",
      "Type of Document",
      "Parties Involved",
    ],
    ["title", "asda", "asd", "fsdfs", "dfsdf"],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForTaxDebt = () => {
  let newData = [
    [
      "Taxpayer",
      "Debt Amount",
      "Expiry Date",
      "Type of Tax",
      "Is Paid",
      "Payment Date",
      "Payment Amount",
    ],
    [
      "John Doe",
      "13123",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "fsdfs",
      "false",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "5454",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForAsset = () => {
  let newData = [
    [
      "Name",
      "Type of Asset",
      "Description",
      "Location",
      "Purchase Date",
      "Purchase Price",
      "Previous Owner",
    ],
    [
      "John Doe",
      "13123",
      "sfsdfsdfs",
      "Istanbul",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "2323232",
      "Jack Doe",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForMilitary = () => {
  let newData = [
    [
      "Name",
      "Date of Birth",
      "State of Military",
      "Postponement Date",
      "Date of Construction",
    ],
    [
      "John Doe",
      "Sat Jan 06 2001 19:18:19 GMT+0200 (GMT+02:00)",
      "Postponed",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForFamilyTree = () => {
  let newData = [
    [
      "Sequence Number",
      "Gender",
      "Degree of Relationship",
      "Name",
      "Surname",
      "Father's Name",
      "Mother's Name",
      "Place of Birth",
      "Date of Birth",
      "City District Neighbourhood/Village",
      "Marital Status",
      "Status",
      "Date of Death",
    ],
    [
      "1",
      "Male",
      "Dad",
      "John",
      "Doe",
      "Jack",
      "Mary",
      "USA",
      "Sat Jan 06 2001 19:18:19 GMT+0200 (GMT+02:00)",
      "Florida",
      "Married",
      "Live",
      "",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForSubscriptionTransaction = () => {
  let newData = [
    [
      "Subscription Type",
      "Company's Name",
      "Subscription Start Date",
      "Subscription End Date",
      "Subscriber Name",
      "Subscriber Surname",
    ],
    ["YouTube Premium", "YouTube", "2/2/2022", "2/2/2024", "John", "Doe"],
  ];

  const url = csvCreator(newData);

  return { url };
};

export const createCSVFileForTrafficDebt = () => {
  let newData = [
    [
      "Debt Payer",
      "Debt Amount",
      "Expiry Date",
      "License Plate",
      "Is Paid",
      "Payment Date",
      "Payment Amount",
    ],
    [
      "John Doe",
      "13123",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "fsdfs",
      "false",
      "Sat Jan 06 2024 19:18:19 GMT+0200 (GMT+02:00)",
      "5454",
    ],
  ];

  const url = csvCreator(newData);

  return { url };
};
