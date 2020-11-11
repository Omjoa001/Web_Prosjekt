// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, CenterCard, AnswerCard, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { BrowseQuizzes, QuizTileGrid, Quiz } from './browsequizzes-components';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
} from './kazoot-service';

const history = createHashHistory();

export class PlayQuiz extends Component {
  id: number = 0;
  quizzes: QuizType = [];
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  quiz: QuizType = {};
  show:boolean = false;
  render() {
    return (
      <>
        <CenterCard title={this.quiz.title}>
          Description: {this.quiz.description} <br></br>ID: {this.id}
        </CenterCard>

        <div>
          {this.questions.map((a) => (
            <div key={a.id}>
              <AnswerCard
                title={a.question}
                answ0={a.answ0}
                answ1={a.answ1}
                answ2={a.answ2}
                answ3={a.answ3}
                show={this.show}
              >
                {console.log(this.show)}
                <div title={a.question}>
                  Question Id: {a.id}
                  <br></br>
                </div>
              </AnswerCard>
              <br></br>
              <br></br>
            </div>
          ))}
        </div>

        <center>
          <Button.Submit onClick={() => {
          this.show = true
          }}>
            SUBMIT ANSWERS
          </Button.Submit>
        </center>
        <br></br>
        <br></br>
        <br></br>
      </>
    );
  }
  mounted() {
    this.id = this.props.match.params.id;
    //quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
    quizService.getQuiz(this.id).then((q) => (this.quiz = q));
    questionService.getQuizQuestion(this.id).then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
    console.log(this.questions)
  }
}
/*
         <Button.Primary>{a.answ0}</Button.Primary>
                &nbsp;&nbsp;&nbsp;
                <Button.Primary>{a.answ1}</Button.Primary>
                <br></br>
                <Button.Primary>{a.answ2}</Button.Primary>
                &nbsp;&nbsp;&nbsp;
                <Button.Primary>{a.answ3}</Button.Primary>
                
                Midlertidig lager for buttons. Slett hvis du ser den, da ble den ikke brukt.
                */