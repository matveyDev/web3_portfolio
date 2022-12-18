import React from "react";
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import store from './store/store';
import App from "./App";


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
