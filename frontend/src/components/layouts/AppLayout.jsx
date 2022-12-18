import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../static/Navbar';


const AppLayout = () => {

  return (
    <>
      <Navbar/>
      <div className='container'>
        <Outlet/>
      </div>
    </>
  );
};

export default AppLayout;
