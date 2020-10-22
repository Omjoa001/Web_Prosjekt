// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
// import { NavLink } from 'react-router-dom';
import { Card, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';

export class Home extends Component {
  sprs: Sprs[] = [];
  question: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="Browse Quizzes"> </Card>
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
    {
      title: 'quiz 3',
      id: 3,
      category: 3,
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
                <Quiz id={quiz.id} title={quiz.title}></Quiz>
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
  title: string = 'hei';
  id: number = 0;

  render() {
    return (
      <>
        <Card title={this.props.title}>
          <Row>
            <Column left>
              <Button.Success>Play</Button.Success>
            </Column>
            <Column right>
              <Button.Danger>Edit</Button.Danger>
            </Column>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    // quizService.getQuizInfo(this.props.id).then((quiz) => (this.props.title = quiz.title));
  }
}

export class EditQuiz extends Component {
  render() {
    return (
      <>
        <Card>Categories</Card>
        <Card>Search</Card>
      </>
    );
  }

  mounted() {}
}