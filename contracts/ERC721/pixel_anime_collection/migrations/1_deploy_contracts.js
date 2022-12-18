const AnimeTyans = artifacts.require("../contracts/AnimeTyans.sol");

module.exports = function(deployer) {
  deployer.deploy(AnimeTyans, 'ipfs://QmPtugKUCUyRgVb8vYdjKoPWDo5UpgQ1jnhFXqEbXzsYw1/', 20);
};
