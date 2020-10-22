// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { App, Menu } from './kazoot-components'
import { Alert } from './widgets'
import { HashRouter, Route } from 'react-router-dom';


const root = document.getElementById('root');
if (root) 
ReactDOM.render(
  <> 
  <HashRouter>
    <Alert />
    <Menu />
    <App />
    <Route exact path="/" component={App} />
    </HashRouter>
 </>,
  root
);