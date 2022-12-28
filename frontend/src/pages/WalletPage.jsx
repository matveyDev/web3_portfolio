import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import './styles/pages.css'
import { injected } from '../components/wallet/connectors';
import { contractInstances } from '../index';


const baseURI = 'https://gateway.pinata.cloud/ipfs/';


const WalletPage = () => {
  const { account, activate } = useWeb3React();
  const [ tokens, setTokens ] = useState([]);

  useEffect(() => {
    activate(injected);

    contractInstances.map(async (instance) => {
      const address = '0x062731E4Af0185c673606e0b807114cb759c7D3B';
      let _tokenIds = [1, 2];
      try {
        _tokenIds = await instance.methods.walletOfOwner(address).call();
      } catch(err) {
        console.log(err);
      };  

      for (let id of _tokenIds) {
        const _tokenURI = await instance.methods.tokenURI(id).call();
        const _imageURI = await getImageUri(_tokenURI);
        
        setTokens((prevTokens) => [
          ...prevTokens,
          {
            imageURI: _imageURI,
          }
        ])
      };
    })
  }, []);

  const getImageUri = async (_tokenURI) => {
    const url = baseURI + _tokenURI.slice(7);
    const response = await fetch(url)
      .then(resp => resp.json())
      .catch(err => console.log(err))

    const result = baseURI + response.image.slice(7);
    return result;
  };

  return (
    <div className='page page__wallet'>
      {tokens.map((token, i) => {
        return <div key={i}><img src={token.imageURI} width='200' /></div>
      })}
    </div>
  );
}

export default WalletPage;
