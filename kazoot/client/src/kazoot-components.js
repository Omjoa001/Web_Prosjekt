// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, CenterCard, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { BrowseQuizzes } from './browsequizzes-components';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
} from './kazoot-service';

const history = createHashHistory();

export class Home extends Component {
  Question: QuizType[] = [];
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="Route test">
          <Button.Success onClick={() => history.push('/BrowseQuizzes')}>
            Browse Quizzes{' '}
          </Button.Success>
          &nbsp;&nbsp;&nbsp; 
          <Button.Success onClick={() => history.push('/quiz/new')}>New Quiz</Button.Success>
        </Card>
      </>
    );
  }

  mounted() {
    questionService.getAllQuestions().then((c) => (this.Question = c));
  }
}
