import * as XLSX from "xlsx";

const xlsxCreator = (data: any) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);

  return url;
};

export const createXLSXFileForEducation = () => {
  let newData = [
    ["Degree", "School Name", "Started Year", "Graduation Year"],
    ["Bachelor degree", "Near East University", "2021", "2024"],
  ];

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForHospital = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForBank = () => {
  let newData = [
    ["Bank Name", "Account Balance", "Account Number", "Account Type"],
    ["Near East Bacnk", "1212", "12341231231", "Normal"],
  ];

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForCriminalRecord = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForNotary = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForTaxDebt = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForAsset = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForMilitary = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForFamilyTree = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};

export const createXLSXFileForSubscriptionTransaction = () => {
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

  const url = xlsxCreator(newData);

  return { url };
};
