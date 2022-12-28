import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ethers } from 'ethers';

import './styles/collections.css';
import { contractInstances } from '../../index';
import CollectionCard from './CollectionCard';


const baseURI = 'https://gateway.pinata.cloud/ipfs/';


const CollectionList = () => {
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

      let _mintCost = await instance.methods.mintCost().call();
      _mintCost = ethers.utils.formatEther(_mintCost);

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
    <div>
      <div className='nft-collections'>
        {
          nftData.map((data, index) => {
            return (
              <CollectionCard key={index} data={data}/>
              )
            })
          }
          <div><Outlet props={nftData}/></div>
      </div>
    </div>
  );
};

export default CollectionList;
