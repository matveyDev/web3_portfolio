import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles/App.css';
import AppLayout from './components/layouts/AppLayout';
import HomePageLayout from './components/layouts/HomePageLayout';
import WalletPage from './pages/WalletPage';

import ListCollections from './components/nftCollections/ListCollections';
import ListTokens from './components/tokens/ListTokens';


const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<AppLayout/>} >
          <Route path='/projects' element={<HomePageLayout/>}>
            <Route path='/projects/nft-collections' element={<ListCollections/>}/>
            <Route path='/projects/tokens' element={<ListTokens/>}/>
          </Route>
          <Route path='/wallet'>
            <Route index element={<WalletPage/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
