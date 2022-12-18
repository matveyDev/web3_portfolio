const Dudes721Token = artifacts.require("../contracts/Dudes.sol");

module.exports = function(deployer) {
  deployer.deploy(Dudes721Token);
};
