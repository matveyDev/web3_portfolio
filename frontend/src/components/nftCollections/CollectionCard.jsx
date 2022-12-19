import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'

import './styles/collections.css'
import { web3 } from '../../index';
import { injected } from '../wallet/connectors';


const CollectionCard = ({data}) => {
  const { account, activate } = useWeb3React();
  const [ soldout, setSoldout ] = useState(false);

  useEffect(() => {
    _setSoldout();

    if (window.ethereum) {
      activate(injected);
    };
  }, []);

  const _setSoldout = async () => {
    if (data.totalSupply == data.maxSupply) {
      setSoldout(true);
    };
  };

  const mint = async () => {
    const _mintCost = web3.utils.toWei(data.mintCost, 'ether');
    if (_mintCost == '0') {
      await data.contractInstace.methods.mint(account).send({from: account});
    } else {
      await data.contractInstace.methods.mint(1).send({from: account, value: _mintCost});
    };
  };

  const renderMintButton = () => {
    let button;
    if (soldout) {
      button = <button className='soldout' disable>SOLDOUT</button>;
    } else {
      button = <button onClick={mint} className='non-soldout'>Mint</button>;
    }
    return button;
  };

  return (
    <div className='collection-card'>
      <div className='collection-card__img'>
        <img src={data.imageURI}/>
      </div>
      <div className='collection-card__title' >{data.name}</div>
      <div className='collection-card__minted' >
        Minted: {data.totalSupply}/{data.maxSupply}
      </div>
      <div className='collection-card__mint-cost'>
        Price: {data.mintCost} ETH
      </div>
      <div className='collection-card__btn-mint'>
        {renderMintButton()}
      </div>
    </div>
  );
};

export default CollectionCard;
