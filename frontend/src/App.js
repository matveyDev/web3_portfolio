import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles/App.css';
import AppLayout from './components/layouts/AppLayout';
import HomePageLayout from './components/layouts/HomePageLayout';
import WalletPage from './pages/WalletPage';

import CollectionDetails from './components/nftCollections/CollectionDetails';
import CollectionList from './components/nftCollections/CollectionList';
import ListTokens from './components/tokens/ListTokens';


const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<AppLayout/>} >
          <Route path='projects' element={<HomePageLayout/>}>
            <Route path='nft-collections' element={<CollectionList/>}>
              <Route path=':contractAddress' element={<CollectionDetails/>} />
            </Route>
            <Route path='tokens' element={<ListTokens/>}/>
          </Route>
          <Route path='wallet'>
            <Route index element={<WalletPage/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
