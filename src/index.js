import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { reduceRight } from 'lodash';

console.log('Superman', process.env.REACT_APP_NAME);

const element = <h1>Hello World!!</h1>;
ReactDom.render(
  /* "BrowserRouter" wraps the "history" component in browsers and passes it down the component tree. Next, register routes so components know what should be rendered based on a given url */
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
