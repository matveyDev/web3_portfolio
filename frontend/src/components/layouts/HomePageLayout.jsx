import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import './styles/homePage.css'


const setActive = ({isActive}) => {
  return isActive ? 'active' : 'non-active';
};


const HomePageLayout = () => {
  return (
    <div className='homePage'>
      <div className='homePage__links'>
        <NavLink className={setActive} to='/projects/tokens'>TOKENS</NavLink>
        <NavLink className={setActive} to='/projects/nft-collections'>NFT COLLECTIONS</NavLink>
        <NavLink className={setActive} to='/projects/tokens/#'>TOKENS</NavLink>
      </div>
      <hr className='homePage_hr' />
      <div className='container'>
        <Outlet/>
      </div>
    </div>
  );
};

export default HomePageLayout;
