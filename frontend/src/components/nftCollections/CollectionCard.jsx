import React, { useEffect, useState } from 'react';

import './styles/collections.css'


const CollectionCard = ({data}) => {
  const [ soldout, setSoldout ] = useState(false);

  useEffect(() => {
    _setSoldout();
  }, []);

  const _setSoldout = async () => {
    if (data.totalSupply == data.maxSupply) {
      setSoldout(true);
    };
  };

  const renderMintButton = () => {
    let button;
    if (soldout) {
      button = <button className='soldout' disable>SOLDOUT</button>;
    } else {
      button = <button className='non-soldout' >Mint</button>;
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
      <div className='collection-card__btn-mint'>
        {renderMintButton()}
      </div>
    </div>
  );
};

export default CollectionCard;
