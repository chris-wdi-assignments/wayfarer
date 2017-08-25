import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" render={props=> {
      console.log('contents of props in index.js', props);
      return <App apiUrl="http://localhost:3001/api" />
    }} />
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
