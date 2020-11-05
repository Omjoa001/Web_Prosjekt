// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
} from './kazoot-service';

const history = createHashHistory();

export class ListQuizzes extends Component {
  quizzes: QuizType[] = [];
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  nextId: number = 0;

  render() {
    return (
      <>
        <Card title="Max id in Quizzes table">
          <Card>
            <Row>{this.nextId}</Row>
          </Card>
        </Card>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Card key={quiz.id} title={quiz.title}>
              <Column>
                <Row>Quiz Id: {quiz.id}</Row>
                <Row>Description: {quiz.description}</Row>
                <Row>Category: </Row>
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
              </Column>
            </Card>
          ))}
        </Card>

        <Card title="Questions">
          {this.questions.map((question) => (
            <Card key={question.id} title={question.question}>
              <Column>
                <Row>Question Id: {question.id}</Row>
                <Row>quizId: {question.quizId}</Row>
                <Row>
                  {' '}
                  <br></br>
                </Row>
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
                <ul>
                  <li>{question.answ0}</li>
                  <li>{question.answ1}</li>
                  <li>{question.answ2}</li>
                  <li>{question.answ3}</li>
                </ul>
              </Column>
            </Card>
          ))}
        </Card>

        <Card title="Categories">
          {this.categories.map((category) => (
            <Card key={category.id} title={category.category}>
              <Row>Category Id: {category.id}</Row>
            </Card>
          ))}
        </Card>
        <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
      </>
    );
  }

  mounted() {
    quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
    quizService.getAllQuizzes().then((q) => (this.quizzes = q));
    //quizService.getQuiz(1).then((q) => (this.quiz = q));
    questionService.getAllQuestions().then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
  }
}
