// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Whiteboard } from './whiteboard-component';
import { Alert } from './widgets';
//Hei
//dette 
//er en merge error
const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <>
      <Alert />
      <Whiteboard />
    </>,
    root
  );
