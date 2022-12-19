import React from "react";
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Web3 from 'web3';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import config from './config.json';
import store from './store/store';
import App from "./App";


const NFT_COLLECTIONS = config.NFT_COLLECTIONS;

const _getInstances = () => {
  let contractInstances = [];
  for (let name in NFT_COLLECTIONS) {
    const collection = NFT_COLLECTIONS[name];
    contractInstances.push(
      new web3.eth.Contract(collection.ABI, collection.CONTRACT_ADDRESS)
    )
  };
  return contractInstances;
};

export const web3 = new Web3(Web3.givenProvider);
export const contractInstances = _getInstances();


function getLibrary(provider) {
  return new Web3Provider(provider);
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App/>
      </Web3ReactProvider>
    </Provider>
  </BrowserRouter>
, document.getElementById("root")
);
