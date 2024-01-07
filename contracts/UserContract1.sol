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

    struct UserAsset {
        AssetInfo[] assetInfos;
        string ipfsHash;
    }

    mapping(string => UserAsset) private assetRecords;

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
}
