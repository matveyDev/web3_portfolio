import React, { useState, useEffect } from 'react';

import './styles/collections.css'
import { web3, contractInstances } from '../../index';
import CollectionCard from './CollectionCard';


const baseURI = 'https://gateway.pinata.cloud/ipfs/';


const ListCollections = () => {
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    _setNftData();
  }, []);

  const _setNftData = async () => {
    contractInstances.map(async (instance) => {
      const _name = await instance.methods.name().call();
      const _totalSupply = await instance.methods.totalSupply().call();
      const _maxSupply = await instance.methods.maxSupply().call();
      // First token image
      const _tokenURI = await instance.methods.tokenURI(1).call();
      const _imageURI = await getImageUri(_tokenURI);

      let _mintCost;
      try {
        _mintCost = await instance.methods.mintCost().call();
        _mintCost = web3.utils.fromWei(_mintCost, 'ether');
      } catch(error) {
        _mintCost = '0';
        console.log(error);
      }

      setNftData((prevData) => [
        ...prevData,
        {
          name: _name,
          totalSupply: _totalSupply,
          maxSupply: _maxSupply,
          imageURI: _imageURI,
          mintCost: _mintCost,
          contractInstace: instance,
        }
      ])
    });
  };

  const getImageUri = async (_tokenURI) => {
    const url = baseURI + _tokenURI.slice(7);
    const response = await fetch(url)
      .then(resp => resp.json())
      .catch(err => console.log(err))

    const result = baseURI + response.image.slice(7);
    return result;
  };

  return (
    <div className='nft-collections'>
      {
        nftData.map((data, index) => {
          return (
            <CollectionCard key={index} data={data}/>
          )
        })
      }
    </div>
  );
};

export default ListCollections;
