import React, { useState, useEffect } from 'react';

import './styles/collections.css'
import { contractInstances } from '../../index';
import CollectionCard from './CollectionCard';


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

      setNftData((prevData) => [
        ...prevData,
        {
          name: _name,
          totalSupply: _totalSupply,
          maxSupply: _maxSupply
        }
      ])
    });
  };

  return (
    <div className='nft-collections'>
      {
        nftData.map((data, index) => {
          return (
            <div key={index}><CollectionCard data={data}/></div>
          )
        })
      }
    </div>
  );
};

export default ListCollections;
