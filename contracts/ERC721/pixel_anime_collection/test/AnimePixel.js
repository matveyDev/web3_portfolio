const AnimeTyans = artifacts.require("../contracts/AnimeTyans.sol");
const utils = require("./utils");
const { time } = require("@openzeppelin/test-helpers");
const expect = require("chai").expect;

const baseURI = "ipfs://QmPtugKUCUyRgVb8vYdjKoPWDo5UpgQ1jnhFXqEbXzsYw1/";
const maxSupply = 20;

contract(AnimeTyans, (accounts) => {
  const toEther = (wei) => wei / 10 ** 18;

  let [alice, bob, chad] = accounts;
  let contractInstance;

  beforeEach(async () => {
    contractInstance = await AnimeTyans.new(baseURI, maxSupply);
  });

  it("test baseURI ", async () => {
    let _baseURI = await contractInstance.baseURI.call();
    expect(_baseURI).to.equal(baseURI);

    contractInstance = await AnimeTyans.new('test', maxSupply);
    _baseURI = await contractInstance.baseURI.call();
    expect(_baseURI).to.not.equal(baseURI);
  });

  it("test maxSupply", async () => {
    let _maxSupply = await contractInstance.maxSupply.call();
    expect(_maxSupply.toNumber()).to.equal(maxSupply);

    contractInstance = await AnimeTyans.new(baseURI, 10);
    _maxSupply = await contractInstance.maxSupply.call();
    expect(_maxSupply.toNumber()).to.not.equal(maxSupply);
  });

  it("test mint with togglePaused", async () => {
    await contractInstance.mint(alice);
    await contractInstance.mint(alice);
    await contractInstance.mint(bob);
    await contractInstance.togglePaused();

    utils.shouldThrowError(contractInstance.mint(alice));
    utils.shouldThrowError(contractInstance.mint(bob));

    await contractInstance.togglePaused();
    await contractInstance.mint(alice);
    await contractInstance.mint(bob);
  });

  it("test mint if soldout", async () => {
    // Mintint all supply (20)
    for (let i = 1; i <= 20; i++) {
      await contractInstance.mint(alice);
    };

    // Soldout
    utils.shouldThrowError(contractInstance.mint(alice));
    utils.shouldThrowError(contractInstance.mint(bob));
  });
});
