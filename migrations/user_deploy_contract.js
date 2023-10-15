const User_Token_Contract = artifacts.require('UserContract');

module.exports = function (deployer) {
  deployer.deploy(User_Token_Contract);
};
