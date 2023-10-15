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

    struct UserEducation {
        EducationInfo[] educationInfos;
        string ipfsHash;
    }

    mapping(string => UserEducation) private educationRecords;

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

    function setIPFSHash(string memory userId, string memory ipfsHash) public {
        UserEducation storage userEducation = educationRecords[userId];

        userEducation.ipfsHash = ipfsHash;

        emit UserEducationUpdated(
            userId,
            userEducation.educationInfos,
            ipfsHash
        );
    }

    function getIPFSHash(
        string memory userId
    ) public view returns (string memory) {
        return educationRecords[userId].ipfsHash;
    }
}
