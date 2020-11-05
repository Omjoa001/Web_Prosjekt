// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
} from './kazoot-service';

export class playQuiz extends Component {
  id: number = 0;
  quizzes: QuizType = [];
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  quiz: QuizType = {};

  render() {
    return (
      <>
        <CenterCard title="Play Quiz">asddadsdafasdfdsafsdf {this.id}</CenterCard>

          <Card title={this.quiz.title}>
          Description: {this.quiz.description}
          {<br></br>}
          Category: {this.quiz.categoryId}
        </Card>


        <Card title="Questions">
          {this.questions.map((a) => (
            <Card key={a.id} title={a.question}>
              <Column>
                <Row>Question Id: {a.id}</Row>
                <Row>quizId: {a.quizId}</Row>
                <Row>
                  {' '}
                  <br></br>
                </Row>
                <ul>
                  <li>{a.answ0}</li>
                  <li>{a.answ1}</li>
                  <li>{a.answ2}</li>
                  <li>{a.answ3}</li>
                </ul>
              </Column>
            </Card>
          ))}
        </Card>


      </>
    );
  }
  mounted() {
    this.id = this.props.match.params.id;
    //quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
    quizService.getQuiz(this.id).then((q) => (this.quiz = q));
    questionService.getQuestion(this.id).then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
    console.log(this.questions)
  }
}
