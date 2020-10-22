// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Button, Form, Column, Alert } from './widgets';
//import { NavLink } from 'react-router-dom';
import questionService from './kazoot-service';
import { quizService } from './kazoot-service';

export class App extends Component {
  sprs: Sprs[] = [];
  question: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="Kategorier"> </Card>
        <Card title="Browse Quizzes">add some link stuff</Card>
        <Card title="spørsmål">
          {this.sprs.map((spr) => (
            <Row key={spr.id}>
              <Column>{spr.question}</Column>
            </Row>
          ))}
        </Card>
      </>
    );
  }

  mounted() {
    questionService.getAll().then((sprs) => (this.sprs = sprs));
    quizService.hey(); // testing that the import works
  }
}

export class BrowseQuizzes extends Component {
  mounted() {}
}
