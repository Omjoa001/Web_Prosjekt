// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
// import { NavLink } from 'react-router-dom';
import { Card, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import questionService from './kazoot-service';
import { quizService, categoryService } from './kazoot-service';

export class Home extends Component {
  sprs: Sprs[] = [];
  question: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="Browse Quizzes">
          <BrowseQuizzes />
        </Card>
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
  }
}

export class BrowseQuiz extends Component {
  render() {
    return (
      <>
        <Card title="kjørda Browser"></Card>
      </>
    );
  }
}

export class NewQuiz extends Component {
  render() {
    return (
      <>
        <Card title="kjørda med ny quiz"></Card>
      </>
    );
  }
}

export class BrowseQuizzes extends Component {
  // dummy quiz array
  quizzes: Quiz[] = [
    {
      title: 'quiz 1',
      id: 1,
      category: 1,
    },
    {
      title: 'quiz 2',
      id: 2,
      category: 2,
    },
  ];
  categories: number[] = [];

  render() {
    return (
      <>
        <Card title="Categories">{this.categories}</Card>
        <Card title="Search"></Card>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Row key={quiz.id}>
              <Column>
                <Quiz id={quiz.id}></Quiz>
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
              </Column>
            </Row>
          ))}
        </Card>
      </>
    );
  }

  mounted() {
    categoryService.getAll().then((categories) => (this.categories = categories));
  }
}

/**
 * Quiz component.
 * Should be called with an id.
 */
export class Quiz extends Component {
  title: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title={this.props.title}>{this.props.id}</Card>
      </>
    );
  }

  mounted() {
    // quizService.get(this.props.id);
  }
}

export class EditQuiz extends Component {
  render() {
    return (
      <>
        <Card >
            <Row>
            rediger: 
            <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
            <Button.Danger onClick={console.log("shiii")}>SLETT QUIZ</Button.Danger>
            </Row>
        </Card>

      </>
    );
  }

  mounted() {}
}
