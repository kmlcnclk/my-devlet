// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract1 {
    struct UserData {
        string email;
        string name;
        uint256 age;
    }

    struct AssetInfo {
        string name;
        string typeOfAsset;
        string description;
        string location;
        uint256 purchaseDate;
        uint256 purchasePrice;
        string previousOwner;
    }

    struct MilitaryInfo {
        string name;
        uint256 dateOfBirth;
        string stateOfMilitary;
        uint256 postponementDate;
        uint256 dateOfConstruction;
    }

    struct FamilyTreeInfo {
        string gender;
        string degreeOfRelationship;
        string name;
        string surname;
        string fathersName;
        string mothersName;
        uint256 dateOfBirth;
        string status;
        uint256 dateOfDeath;
    }

    struct SubscriptionTransactionInfo {
        string subscriptionType;
        string companyName;
        uint256 subscriptionStartDate;
        uint256 subscriptionEndDate;
        string subscriberName;
        string subscriberSurname;
    }

    struct TrafficDebtInfo {
        string debtPayer;
        uint256 debtAmount;
        uint256 expiryDate;
        string licensePlate;
        bool isPaid;
        uint256 paymentDate;
        uint256 paymentAmount;
    }

    struct UserAsset {
        AssetInfo[] assetInfos;
        string ipfsHash;
    }

    struct UserMilitary {
        MilitaryInfo[] militaryInfos;
        string ipfsHash;
    }

    struct UserFamilyTree {
        FamilyTreeInfo[] familyTreeInfos;
        string ipfsHash;
    }

    struct UserSubscriptionTransaction {
        SubscriptionTransactionInfo[] subscriptionTransactionInfos;
        string ipfsHash;
    }

    struct UserTrafficDebt {
        TrafficDebtInfo[] trafficDebtInfos;
        string ipfsHash;
    }

    mapping(string => UserAsset) private assetRecords;
    mapping(string => UserMilitary) private militaryRecords;
    mapping(string => UserFamilyTree) private familyTreeRecords;
    mapping(string => UserSubscriptionTransaction)
        private subscriptionTransactionRecords;
    mapping(string => UserTrafficDebt) private trafficDebtRecords;

    mapping(string => UserData) users;

    event UserUpdated(
        string indexed userId,
        string email,
        string name,
        uint256 age
    );

    event UserAssetUpdated(
        string indexed userId,
        AssetInfo[] assetInfos,
        string ipfsHash
    );

    event UserMilitaryUpdated(
        string indexed userId,
        MilitaryInfo[] militrayInfos,
        string ipfsHash
    );

    event UserFamilyTreeUpdated(
        string indexed userId,
        FamilyTreeInfo[] familyTreeInfos,
        string ipfsHash
    );

    event UserSubscriptionTransactionUpdated(
        string indexed userId,
        SubscriptionTransactionInfo[] subscriptionTransactionInfos,
        string ipfsHash
    );

    event UserTrafficDebtUpdated(
        string indexed userId,
        TrafficDebtInfo[] trafficDebtInfos,
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

    function setAssetRecord(
        string memory userId,
        string[] memory names,
        string[] memory typeOfAssets,
        string[] memory descriptions,
        string[] memory locations,
        uint256[] memory purchaseDates,
        uint256[] memory purchasePrices,
        string[] memory previousOwners,
        string memory ipfsHash
    ) public {
        require(
            names.length == typeOfAssets.length &&
                typeOfAssets.length == descriptions.length &&
                descriptions.length == locations.length &&
                locations.length == purchaseDates.length &&
                purchaseDates.length == purchasePrices.length &&
                purchasePrices.length == previousOwners.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < names.length; i++) {
            AssetInfo memory newAsset = AssetInfo({
                name: names[i],
                typeOfAsset: typeOfAssets[i],
                description: descriptions[i],
                location: locations[i],
                purchaseDate: purchaseDates[i],
                purchasePrice: purchasePrices[i],
                previousOwner: previousOwners[i]
            });

            assetRecords[userId].assetInfos.push(newAsset);
        }

        assetRecords[userId].ipfsHash = ipfsHash;

        emit UserAssetUpdated(
            userId,
            assetRecords[userId].assetInfos,
            ipfsHash
        );
    }

    function getAssetRecords(
        string memory userId
    ) public view returns (AssetInfo[] memory) {
        return assetRecords[userId].assetInfos;
    }

    function setAssetIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserAsset storage userAsset = assetRecords[userId];

        userAsset.ipfsHash = ipfsHash;

        emit UserAssetUpdated(userId, userAsset.assetInfos, ipfsHash);
    }

    function getAssetIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return assetRecords[userId].ipfsHash;
    }

    function setMilitaryRecord(
        string memory userId,
        string[] memory names,
        uint256[] memory dateOfBirths,
        string[] memory stateOfMilitarys,
        uint256[] memory postponementDates,
        uint256[] memory dateOfConstructions,
        string memory ipfsHash
    ) public {
        require(
            names.length == dateOfBirths.length &&
                dateOfBirths.length == stateOfMilitarys.length &&
                stateOfMilitarys.length == postponementDates.length &&
                postponementDates.length == dateOfConstructions.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < names.length; i++) {
            MilitaryInfo memory newMilitary = MilitaryInfo({
                name: names[i],
                dateOfBirth: dateOfBirths[i],
                stateOfMilitary: stateOfMilitarys[i],
                postponementDate: postponementDates[i],
                dateOfConstruction: dateOfConstructions[i]
            });

            militaryRecords[userId].militaryInfos.push(newMilitary);
        }

        militaryRecords[userId].ipfsHash = ipfsHash;

        emit UserMilitaryUpdated(
            userId,
            militaryRecords[userId].militaryInfos,
            ipfsHash
        );
    }

    function getMilitaryRecords(
        string memory userId
    ) public view returns (MilitaryInfo[] memory) {
        return militaryRecords[userId].militaryInfos;
    }

    function setMilitaryIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserMilitary storage userMilitary = militaryRecords[userId];

        userMilitary.ipfsHash = ipfsHash;

        emit UserMilitaryUpdated(userId, userMilitary.militaryInfos, ipfsHash);
    }

    function getMilitaryIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return militaryRecords[userId].ipfsHash;
    }

    function setFamilyTreeRecord(
        string memory userId,
        string[] memory genders,
        string[] memory degreeOfRelationships,
        string[] memory names,
        string[] memory surnames,
        string[] memory fathersNames,
        string[] memory mothersNames,
        uint256[] memory dateOfBirths,
        string[] memory statuss,
        uint256[] memory dateOfDeaths,
        string memory ipfsHash
    ) public {
        require(
            genders.length == degreeOfRelationships.length &&
                degreeOfRelationships.length == names.length &&
                names.length == surnames.length &&
                surnames.length == fathersNames.length &&
                fathersNames.length == mothersNames.length &&
                mothersNames.length == dateOfBirths.length &&
                dateOfBirths.length == statuss.length &&
                statuss.length == dateOfDeaths.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < genders.length; i++) {
            FamilyTreeInfo memory newFamilyTree = FamilyTreeInfo({
                gender: genders[i],
                degreeOfRelationship: degreeOfRelationships[i],
                name: names[i],
                surname: surnames[i],
                fathersName: fathersNames[i],
                mothersName: mothersNames[i],
                dateOfBirth: dateOfBirths[i],
                status: statuss[i],
                dateOfDeath: dateOfDeaths[i]
            });

            familyTreeRecords[userId].familyTreeInfos.push(newFamilyTree);
        }

        familyTreeRecords[userId].ipfsHash = ipfsHash;

        emit UserFamilyTreeUpdated(
            userId,
            familyTreeRecords[userId].familyTreeInfos,
            ipfsHash
        );
    }

    function getFamilyTreeRecords(
        string memory userId
    ) public view returns (FamilyTreeInfo[] memory) {
        return familyTreeRecords[userId].familyTreeInfos;
    }

    function setFamilyTreeIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserFamilyTree storage userFamilyTree = familyTreeRecords[userId];

        userFamilyTree.ipfsHash = ipfsHash;

        emit UserFamilyTreeUpdated(
            userId,
            userFamilyTree.familyTreeInfos,
            ipfsHash
        );
    }

    function getFamilyTreeIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return familyTreeRecords[userId].ipfsHash;
    }

    function setSubscriptionTransactionRecord(
        string memory userId,
        string[] memory subscriptionTypes,
        string[] memory companyNames,
        uint256[] memory subscriptionStartDates,
        uint256[] memory subscriptionEndDates,
        string[] memory subscriberNames,
        string[] memory subscriberSurnames,
        string memory ipfsHash
    ) public {
        require(
            subscriptionTypes.length == companyNames.length &&
                companyNames.length == subscriptionStartDates.length &&
                subscriptionStartDates.length == subscriptionEndDates.length &&
                subscriptionEndDates.length == subscriberNames.length &&
                subscriberNames.length == subscriberSurnames.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < subscriptionTypes.length; i++) {
            SubscriptionTransactionInfo
                memory newSubscriptionTransaction = SubscriptionTransactionInfo({
                    subscriptionType: subscriptionTypes[i],
                    companyName: companyNames[i],
                    subscriptionStartDate: subscriptionStartDates[i],
                    subscriptionEndDate: subscriptionEndDates[i],
                    subscriberName: subscriberNames[i],
                    subscriberSurname: subscriberSurnames[i]
                });

            subscriptionTransactionRecords[userId]
                .subscriptionTransactionInfos
                .push(newSubscriptionTransaction);
        }

        subscriptionTransactionRecords[userId].ipfsHash = ipfsHash;

        emit UserSubscriptionTransactionUpdated(
            userId,
            subscriptionTransactionRecords[userId].subscriptionTransactionInfos,
            ipfsHash
        );
    }

    function getSubscriptionTransactionRecords(
        string memory userId
    ) public view returns (SubscriptionTransactionInfo[] memory) {
        return
            subscriptionTransactionRecords[userId].subscriptionTransactionInfos;
    }

    function setSubscriptionTransactionIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserSubscriptionTransaction
            storage userSubscriptionTransaction = subscriptionTransactionRecords[
                userId
            ];

        userSubscriptionTransaction.ipfsHash = ipfsHash;

        emit UserSubscriptionTransactionUpdated(
            userId,
            userSubscriptionTransaction.subscriptionTransactionInfos,
            ipfsHash
        );
    }

    function getSubscriptionTransactionIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return subscriptionTransactionRecords[userId].ipfsHash;
    }

    function setTrafficDebtRecord(
        string memory userId,
        string[] memory debtPayers,
        uint256[] memory debtAmounts,
        uint256[] memory expiryDates,
        string[] memory licensePlates,
        bool[] memory isPaids,
        uint256[] memory paymentDates,
        uint256[] memory paymentAmounts,
        string memory ipfsHash
    ) public {
        require(
            debtPayers.length == debtAmounts.length &&
                debtAmounts.length == expiryDates.length &&
                expiryDates.length == licensePlates.length &&
                licensePlates.length == isPaids.length &&
                isPaids.length == paymentDates.length &&
                paymentDates.length == paymentAmounts.length,
            "Input arrays must have the same length"
        );

        for (uint256 i = 0; i < debtPayers.length; i++) {
            TrafficDebtInfo memory newTrafficDebt = TrafficDebtInfo({
                debtPayer: debtPayers[i],
                debtAmount: debtAmounts[i],
                expiryDate: expiryDates[i],
                licensePlate: licensePlates[i],
                isPaid: isPaids[i],
                paymentDate: paymentDates[i],
                paymentAmount: paymentAmounts[i]
            });

            trafficDebtRecords[userId].trafficDebtInfos.push(newTrafficDebt);
        }

        trafficDebtRecords[userId].ipfsHash = ipfsHash;

        emit UserTrafficDebtUpdated(
            userId,
            trafficDebtRecords[userId].trafficDebtInfos,
            ipfsHash
        );
    }

    function getTrafficDebtRecords(
        string memory userId
    ) public view returns (TrafficDebtInfo[] memory) {
        return trafficDebtRecords[userId].trafficDebtInfos;
    }

    function setTrafficDebtIPFSHash(
        string memory userId,
        string memory ipfsHash
    ) public {
        UserTrafficDebt storage userTrafficDebt = trafficDebtRecords[userId];

        userTrafficDebt.ipfsHash = ipfsHash;

        emit UserTrafficDebtUpdated(
            userId,
            userTrafficDebt.trafficDebtInfos,
            ipfsHash
        );
    }

    function getTrafficDebtIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return trafficDebtRecords[userId].ipfsHash;
    }
}
