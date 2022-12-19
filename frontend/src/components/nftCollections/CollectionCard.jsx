import React from 'react';

import './styles/collections.css'



const CollectionCard = ({data}) => {

  return (
    <div className='collection-card'>
      <div className='collection-card__img'>
        <img src={data.imageURI}/>
      </div>
      <div className='collection-card__title' >{data.name}</div>
    </div>
  );
};

export default CollectionCard;
