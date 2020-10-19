// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Whiteboard } from './whiteboard-component';
import { Alert } from './widgets';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <>
      <Alert />
      <Whiteboard />
    </>,
    root
  );
