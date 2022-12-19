import React from 'react';


const CollectionCard = ({data}) => {
  return (
    <div className='collection-card'>
      {data.name}
    </div>
  );
};

export default CollectionCard;
