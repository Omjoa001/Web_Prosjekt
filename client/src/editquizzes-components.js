// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { QuizEditor, Question } from './kazoot-components';
import {
  type QuizType,
  type CategoryType,
  type CategoryFilterType,
  type QuestionType,
  type AnswerType,
  type StateQuestionType,
} from './kazoot-service';

const history = createHashHistory();

/**
 * Edit quiz page component.
 */
export class EditQuiz extends Component<{ match: { params: { id: number } } }> {
  id: number = 0;
  questions: QuestionType[] = [];
  categories: CategoryFilterType[] = [];
  quiz: QuizType = {};

  mounted() {
    this.id = this.props.match.params.id;
    quizService.getQuiz(this.id).then((q) => {
      this.quiz = q;
      console.log(`editquiz mounted quiz: ${JSON.stringify(this.quiz)}`);
    });
    questionService.getQuizQuestion(this.id).then((p) => (this.questions = p));
  }

  render() {
    return (
      <>
        <QuizEditor cardtitle="📣 Editing Quiz 📣" mode="edit" id={this.id} />
      </>
    );
  }
}

