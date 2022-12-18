// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";


contract AnimeTyans is ERC721Enumerable, ERC721Burnable, Ownable {
    using Strings for uint256;
    using SafeMath for uint8;

    string public baseURI;
    uint8 public immutable maxSupply;
    uint8 private tokenIdCounter = 1;
    bool paused = false;

    constructor(
        string memory _baseURI, 
        uint8 _maxSupply)
    ERC721("Anime Tyans", "TYANS") {
        baseURI = _baseURI;
        maxSupply = _maxSupply;
    }

    modifier isSoldOut() {
        require(maxSupply >= tokenIdCounter, "SOLD OUT");
        _;
    }

    modifier isPaused() {
        require(paused != true, "Mint has been paused");
        _;
    }

    function mint(address _to) public isSoldOut isPaused {
        uint256 tokenId = tokenIdCounter;
        tokenIdCounter = uint8(tokenIdCounter.add(1));
        _safeMint(_to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "ERC721: invalid token ID");

    return bytes(baseURI).length > 0 ?
        string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) :
        "";
    }

    function togglePaused() public onlyOwner {
        paused = !paused;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
