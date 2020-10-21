// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Button, Form, Column, Alert } from './widgets';
//import { NavLink } from 'react-router-dom';
import quizService from './task-service';

//Halla!


class App extends Component {
  sprs: Sprs[] = [];

  render() {
    return (
      <>
    <Card title="Welcome">This is Quiz App
    </Card>
    <Card title='Kategorier'> </Card>
    <Card title='spørsmål'> 
      {this.sprs.map((sprs) =>  (
        <Row key={sprs.id}>
          <Column> 
            {sprs.spørsmål}
          </Column>
        </Row>
      ))}
    </Card>

  </>
    );
  }

  mounted() {
    quizService
    .getAll()
    .then((sprs) => (this.sprs = sprs))
  }
}



const root = document.getElementById('root');
if (root)
  ReactDOM.render(
      <>
        <Alert />
        <App />
      </>,
    root
  );
