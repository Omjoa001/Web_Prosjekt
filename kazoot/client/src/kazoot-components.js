// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import quizService from './kazoot-service';

export class Home extends Component {
  sprs: Sprs[] = [];
  question: string = '';
  id: number = 0;




  render() {
    return (
      <>
    <Card title="Welcome">This is Quiz App
    </Card>
    <Card title='Kategorier'> </Card>
    <Card title='spørsmål'> 
   
      {this.sprs.map((spr) =>  (
        <Row key={spr.id}>
          <Column> 
            {spr.question}
          </Column>
        </Row>
      ))}
    </Card>

  </>
    );
  }
//test
  mounted() {
    quizService
    .getAll()
    .then((sprs) => (this.sprs = sprs))
  }
}

export class BrowseQuiz extends Component{
    render(){
        return (
        <>
        <Card title="kjørda Browser">
            
        </Card>
        </>
        );
    }

}

export class NewQuiz extends Component{
    render(){
        return (
        <>
        <Card title="kjørda med ny quiz">
            
        </Card>
        </>
        );
    }

}