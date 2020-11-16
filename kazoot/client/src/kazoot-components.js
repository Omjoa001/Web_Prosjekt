// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, CenterCard, TileCard, LayoutCenter, Row, Button, Form, Column, Alert, NavBar } from './widgets';
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
        <LayoutCenter title="Welcome">
          <div class= 'font-italic'>To Kazoot - our Quiz App </div> <br></br>
        <h4><small class='font-italic, text-muted'>Find a playable quiz by browsing through <br></br>
        existing quizzes by clicking on "Browse Quiz" <br></br>  
        or click on "New Quiz" to create a new quiz.  
        </small></h4>
      </LayoutCenter>

        <Card> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button.Start onClick={() => history.push('/BrowseQuizzes') }>
            Browse Quizzes{' '}
          </Button.Start>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button.Start onClick={() => history.push('/quiz/new')}>New Quiz</Button.Start>
        </Card>
      </>
    );
  }

  mounted() {
    questionService.getAllQuestions().then((c) => (this.Question = c));
  }
}
