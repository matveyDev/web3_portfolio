import React from 'react';

import './styles/collections.css'
import CollectionCard from './CollectionCard';


const ListCollections = () => {
  return (
    <div className='nft-collections'>
      <div><CollectionCard name='SADSADSADDAS' symbol='asd' /></div>
      <div><CollectionCard name='SADSADSADDAS' symbol='asd' /></div>
    </div>
  );
};

export default ListCollections;
