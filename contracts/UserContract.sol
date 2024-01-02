// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
    struct UserData {
        string email;
        string name;
        uint256 age;
    }

    struct EducationInfo {
        string schoolName;
        string degree;
        uint256 startedYear;
        uint256 graduationYear;
    }

    struct BankInfo {
        string bankName;
        uint256 accountBalance;
        string accountNumber;
        string accountType;
        uint256 accountOpeningDate;
    }

    struct HospitalInfo {
        string hospitalName;
        string doctorName;
        string name;
        string symptoms;
        string diagnosticMethods;
        uint256 date;
        string treatmentOptions;
        string importantInformation;
    }

    struct NotaryInfo {
        string title;
        string description;
        uint256 date;
        string notaryName;
        string typeOfDocument;
        string partiesInvolved;
    }

    struct TaxDebtInfo {
        string taxpayer;
        uint256 debtAmount;
        uint256 expiryDate;
        string typeOfTax;
        bool isPaid;
        uint256 paymentDate;
        uint256 paymentAmount;
    }

    struct UserEducation {
        EducationInfo[] educationInfos;
        string ipfsHash;
    }

    struct UserBank {
        BankInfo[] bankInfos;
        string ipfsHash;
    }

    struct UserHospital {
        HospitalInfo[] hospitalInfos;
        string ipfsHash;
    }

    struct UserNotary {
        NotaryInfo[] notaryInfos;
        string ipfsHash;
    }

    struct UserTaxDebt {
        TaxDebtInfo[] taxDebtInfos;
        string ipfsHash;
    }

    mapping(string => UserEducation) private educationRecords;
    mapping(string => UserBank) private bankRecords;
    mapping(string => UserHospital) private hospitalRecords;
    mapping(string => UserNotary) private notaryRecords;
    mapping(string => UserTaxDebt) private taxDebtRecords;

    mapping(string => UserData) users;

    event UserUpdated(
        string indexed userId,
        string email,
        string name,
        uint256 age
    );

    event UserEducationUpdated(
        string indexed userId,
        EducationInfo[] educationInfos,
        string ipfsHash
    );

    event UserBankUpdated(
        string indexed userId,
        BankInfo[] bankInfos,
        string ipfsHash
    );

    event UserHospitalUpdated(
        string indexed userId,
        HospitalInfo[] hospitalInfos,
        string ipfsHash
    );

    event UserNotaryUpdated(
        string indexed userId,
        NotaryInfo[] notaryInfos,
        string ipfsHash
    );

    event UserTaxDebtUpdated(
        string indexed userId,
        TaxDebtInfo[] taxDebtInfos,
        string ipfsHash
    );

    function setUserData(
        string memory userId,
        UserData memory userData
    ) public {
        UserData memory newUser = UserData(
            userData.email,
            userData.name,
            userData.age
        );
        users[userId] = newUser;
        emit UserUpdated(userId, userData.email, userData.name, userData.age);
    }

    function getUserData(
        string memory userId
    )
        public
        view
        returns (string memory email, string memory name, uint256 age)
    {
        UserData storage user = users[userId];
        return (user.email, user.name, user.age);
    }

    // function setEducationRecord(
    //     string memory userId,
    //     EducationInfo[] memory educationInfos,
    //     string memory ipfsHash
    // ) public {
    //     UserEducation storage userEducation = educationRecords[userId];

    //     userEducation.educationInfos = educationInfos;
    //     userEducation.ipfsHash = ipfsHash;

    //     // UserEducation memory newUserEducation = UserEducation(
    //     //     educationInfos,
    //     //     ipfsHash
    //     // );

    //     educationRecords[userId] = userEducation;
    //     emit UserEducationUpdated(userId, educationInfos, ipfsHash);
    // }

    function setEducationRecord(
        string memory userId,
        string[] memory schoolNames,
        string[] memory degrees,
        uint256[] memory startedYears,
        uint256[] memory graduationYears,
        string memory ipfsHash
    ) public {
        require(
            schoolNames.length == degrees.length &&
                degrees.length == startedYears.length &&
                startedYears.length == graduationYears.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < schoolNames.length; i++) {
            EducationInfo memory newEducation = EducationInfo({
                schoolName: schoolNames[i],
                degree: degrees[i],
                startedYear: startedYears[i],
                graduationYear: graduationYears[i]
            });

            educationRecords[userId].educationInfos.push(newEducation);
        }

        educationRecords[userId].ipfsHash = ipfsHash;

        emit UserEducationUpdated(
            userId,
            educationRecords[userId].educationInfos,
            ipfsHash
        );
    }

    function getEducationRecords(
        string memory userId
    ) public view returns (EducationInfo[] memory) {
        return educationRecords[userId].educationInfos;
    }

    function setEducationIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserEducation storage userEducation = educationRecords[userId];

        userEducation.ipfsHash = ipfsHash;

        emit UserEducationUpdated(
            userId,
            userEducation.educationInfos,
            ipfsHash
        );
    }

    function getEducationIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return educationRecords[userId].ipfsHash;
    }

    function setBankRecord(
        string memory userId,
        string[] memory bankNames,
        uint256[] memory accountBalances,
        string[] memory accountNumbers,
        string[] memory accountTypes,
        uint256[] memory accountOpeningDates,
        string memory ipfsHash
    ) public {
        require(
            bankNames.length == accountBalances.length &&
                accountBalances.length == accountNumbers.length &&
                accountNumbers.length == accountTypes.length &&
                accountTypes.length == accountOpeningDates.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < bankNames.length; i++) {
            BankInfo memory newBank = BankInfo({
                bankName: bankNames[i],
                accountBalance: accountBalances[i],
                accountNumber: accountNumbers[i],
                accountType: accountTypes[i],
                accountOpeningDate: accountOpeningDates[i]
            });

            bankRecords[userId].bankInfos.push(newBank);
        }

        bankRecords[userId].ipfsHash = ipfsHash;

        emit UserBankUpdated(userId, bankRecords[userId].bankInfos, ipfsHash);
    }

    function getBankRecords(
        string memory userId
    ) public view returns (BankInfo[] memory) {
        return bankRecords[userId].bankInfos;
    }

    function setBankIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserBank storage userBank = bankRecords[userId];

        userBank.ipfsHash = ipfsHash;

        emit UserBankUpdated(userId, userBank.bankInfos, ipfsHash);
    }

    function getBankIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return bankRecords[userId].ipfsHash;
    }

    function setHospitalRecord(
        string memory userId,
        string[] memory hospitalNames,
        string[] memory doctorNames,
        string[] memory names,
        string[] memory symptomss,
        string[] memory diagnosticMethodss,
        uint256[] memory dates,
        string[] memory treatmentOptionss,
        string[] memory importantInformations,
        string memory ipfsHash
    ) public {
        require(
            hospitalNames.length == doctorNames.length &&
                doctorNames.length == names.length &&
                names.length == symptomss.length &&
                symptomss.length == diagnosticMethodss.length &&
                diagnosticMethodss.length == dates.length &&
                dates.length == treatmentOptionss.length &&
                treatmentOptionss.length == importantInformations.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < hospitalNames.length; i++) {
            HospitalInfo memory newHospital = HospitalInfo({
                hospitalName: hospitalNames[i],
                doctorName: doctorNames[i],
                name: names[i],
                symptoms: symptomss[i],
                diagnosticMethods: diagnosticMethodss[i],
                date: dates[i],
                treatmentOptions: treatmentOptionss[i],
                importantInformation: importantInformations[i]
            });

            hospitalRecords[userId].hospitalInfos.push(newHospital);
        }

        hospitalRecords[userId].ipfsHash = ipfsHash;

        emit UserHospitalUpdated(
            userId,
            hospitalRecords[userId].hospitalInfos,
            ipfsHash
        );
    }

    function getHospitalRecords(
        string memory userId
    ) public view returns (HospitalInfo[] memory) {
        return hospitalRecords[userId].hospitalInfos;
    }

    function setHospitalIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserHospital storage userHospital = hospitalRecords[userId];

        userHospital.ipfsHash = ipfsHash;

        emit UserHospitalUpdated(userId, userHospital.hospitalInfos, ipfsHash);
    }

    function getHospitalIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return hospitalRecords[userId].ipfsHash;
    }

    function setNotaryRecord(
        string memory userId,
        string[] memory titles,
        string[] memory descriptions,
        uint256[] memory dates,
        string[] memory notaryNames,
        string[] memory typeOfDocuments,
        string[] memory partiesInvolveds,
        string memory ipfsHash
    ) public {
        require(
            titles.length == descriptions.length &&
                descriptions.length == dates.length &&
                dates.length == notaryNames.length &&
                notaryNames.length == typeOfDocuments.length &&
                typeOfDocuments.length == partiesInvolveds.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < titles.length; i++) {
            NotaryInfo memory newNotary = NotaryInfo({
                title: titles[i],
                description: descriptions[i],
                date: dates[i],
                notaryName: notaryNames[i],
                typeOfDocument: typeOfDocuments[i],
                partiesInvolved: partiesInvolveds[i]
            });

            notaryRecords[userId].notaryInfos.push(newNotary);
        }

        notaryRecords[userId].ipfsHash = ipfsHash;

        emit UserNotaryUpdated(
            userId,
            notaryRecords[userId].notaryInfos,
            ipfsHash
        );
    }

    function getNotaryRecords(
        string memory userId
    ) public view returns (NotaryInfo[] memory) {
        return notaryRecords[userId].notaryInfos;
    }

    function setNotaryIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserNotary storage userNotary = notaryRecords[userId];

        userNotary.ipfsHash = ipfsHash;

        emit UserNotaryUpdated(userId, userNotary.notaryInfos, ipfsHash);
    }

    function getNotaryIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return notaryRecords[userId].ipfsHash;
    }

    function setTaxDebtRecord(
        string memory userId,
        string[] memory taxpayers,
        uint256[] memory debtAmounts,
        uint256[] memory expiryDates,
        string[] memory typeOfTaxs,
        bool[] memory isPaids,
        uint256[] memory paymentDates,
        uint256[] memory paymentAmounts,
        string memory ipfsHash
    ) public {
        require(
            taxpayers.length == debtAmounts.length &&
                debtAmounts.length == expiryDates.length &&
                expiryDates.length == typeOfTaxs.length &&
                typeOfTaxs.length == isPaids.length &&
                isPaids.length == paymentDates.length &&
                paymentDates.length == paymentAmounts.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < taxpayers.length; i++) {
            TaxDebtInfo memory newTaxDebt = TaxDebtInfo({
                taxpayer: taxpayers[i],
                debtAmount: debtAmounts[i],
                expiryDate: expiryDates[i],
                typeOfTax: typeOfTaxs[i],
                isPaid: isPaids[i],
                paymentDate: paymentDates[i],
                paymentAmount: paymentAmounts[i]
            });

            taxDebtRecords[userId].taxDebtInfos.push(newTaxDebt);
        }

        taxDebtRecords[userId].ipfsHash = ipfsHash;

        emit UserTaxDebtUpdated(
            userId,
            taxDebtRecords[userId].taxDebtInfos,
            ipfsHash
        );
    }

    function getTaxDebtRecords(
        string memory userId
    ) public view returns (TaxDebtInfo[] memory) {
        return taxDebtRecords[userId].taxDebtInfos;
    }

    function setTaxDebtIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserTaxDebt storage userTaxDebt = taxDebtRecords[userId];

        userTaxDebt.ipfsHash = ipfsHash;

        emit UserTaxDebtUpdated(userId, userTaxDebt.taxDebtInfos, ipfsHash);
    }

    function getTaxDebtIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return taxDebtRecords[userId].ipfsHash;
    }
}
