import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import './styles/collections.css';
import { injected } from '../wallet/connectors';
import { setInstance } from '../../store/contractSlice';
import CollectionDetails from './CollectionDetails';


const CollectionCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account, activate } = useWeb3React();
  const [soldout, setSoldout] = useState(false);

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
    const _mintCost = ethers.utils.parseEther(data.mintCost);
    if (_mintCost == '0') {
      await data.contractInstace.methods.mint(account).send({ from: account });
    } else {
      await data.contractInstace.methods.mint(1).send({ from: account, value: _mintCost });
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

  const _onClick = async () => {
    navigate(`${data.contractInstace._address}`);
    dispatch(setInstance(data.contractInstace));

    // Hide list collections
    const elements = document.querySelectorAll('.collection-card');
    console.log(elements[0])
  };

  return (
    <div className='collection-card'>
      <div onClick={_onClick} className='collection-card__body'>
        <div className='collection-card__img'>
          <img src={data.imageURI} />
        </div>
        <div className='collection-card__title' >{data.name}</div>
        <div className='collection-card__minted' >
          Minted: {data.totalSupply}/{data.maxSupply}
        </div>
        <div className='collection-card__mint-cost'>
          Price: {data.mintCost} ETH
        </div>
      </div>
      <div className='collection-card__btn-mint'>
        {renderMintButton()}
      </div>
    </div>
  );
};

export default CollectionCard;
