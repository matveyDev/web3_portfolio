import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles/navbar.css';


const setActive = ({isActive}) => {
  return isActive ? 'active-nav' : 'non-active';
};


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__links'>
        <NavLink className={setActive} to='/projects'>Projects</NavLink>
        <NavLink className={setActive} to='/wallet'>Wallet</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
