// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, QuestionCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { QuizEditor, Question } from './kazoot-components'
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
  type StateQuestionType,
} from './kazoot-service';

const history = createHashHistory();

/**
 * Component which renders the New Quiz page.
 * This component stores an array of question objects in its state.
 * These question objects are used to create question components,
 * which render the information stored in them.
 * These question components receive callbacks to update the parent's state as props.
 */
export class NewQuiz extends Component {
  render() {
    return (
      <>
        <QuizEditor cardtitle="📣 Creating a new quiz! 📣" mode="new" />
      </>
    );
  }
}
