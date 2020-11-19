// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import {
  Card,
  CenterCard,
  AnswerCard,
  TileCard,
  Row,
  Button,
  Form,
  Column,
  Alert,
  NavBar,
} from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { BrowseQuizzes, Quiz } from './browsequizzes-components';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
} from './kazoot-service';

const history = createHashHistory();

export class PlayQuiz extends Component {
  id: number = 0;
  quizzes: QuizType[] = [];
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  quiz: QuizType = {};
  show: boolean = false;
  shuffledQuestions: QuestionType[] = [];
  points: number = 0;
  totalPoints: number = 0;
  resultText: string = '';

  //sendPoints is used so childcomponents have a parentCallback for addign points
  /*sendPoints() {
    this.points += 1;
  }*/

  randomizeOrder(array: QuestionType[]) {
    this.questions.map((q) => {
      this.totalPoints += q.numCorrect;
    });
    let i = array.length - 1;
    for (i; i >= 0; i--) {
      let answOrder: Array<[string, number]> = [];
      //pushes the following variables: answer string, whether it is correct (boolean), and setStyle bool
      answOrder.push(
        [array[i].answ0, 0, false],
        [array[i].answ1, 0, false],
        [array[i].answ2, 0, false],
        [array[i].answ3, 0, false]
      );
      for (let x = 0; x < array[i].numCorrect; x++) {
        answOrder[x].splice(1, 1, 1);
      }
      this.randomizeAnswerArr(answOrder);

      let tempQuestionObject = {
        answ0: answOrder[0],
        answ1: answOrder[1],
        answ2: answOrder[2],
        answ3: answOrder[3],
        id: array[i].id,
        numCorrect: array[i].numCorrect,
        question: array[i].question,
        quizId: array[i].quizId,
      };
      this.shuffledQuestions.push(tempQuestionObject);
    }
  }

  randomizeAnswerArr(array: []) {
    let i = array.length - 1;
    for (i; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  points: number = 0;

  selectStyle = [{}, {}, {}, {}];
  //Funksjon som plusser på en variabel, som blir pusha til en array for hver button. Da har vi en liste med unik identifikator på hver svar. Det kan stil sjekke før den setter verdi, og onclick flipper verdien.
  stil(num: number, corr: boolean, style: boolean) {
    style = !style;
    if (corr) {
      console.log('haei');
      this.points++;
    }
    for (let i = 1; i <= this.selectStyle.length; i++) {
      if (num == i) {
        this.selectStyle[i - 1] = { border: '3px solid navy' };
      }
    }
  }
  styleBools = [];
  render() {
    return (
      <>
        <CenterCard title={this.quiz.title}>
          {this.quiz.description}
          <br></br>
          <br></br>
        </CenterCard>

        <div>
          {this.shuffledQuestions.map((a) => (
            <div key={a.id}>
              <AnswerCard title={a.question}>
                <div title={a.question}>
                  Correct answers: {a.numCorrect}
                  <br></br>
                </div>
                <Button.Answer
                  onClick={this.stil.bind(this, 1, a.answ0[1])}
                  style={a.answ0[2] ? { border: '3px solid navy' } : { border: '3px solid red' }}
                  correct={a.answ0[1]}
                  show={this.show}
                >
                  {a.answ0[0]}
                </Button.Answer>
                <Button.Answer
                  style={a.answ1[2] ? { border: '3px solid navy' } : { border: '3px solid red' }}
                  onClick={this.stil.bind(this, 2, a.answ1[1])}
                  correct={a.answ1[1]}
                  show={this.show}
                >
                  {a.answ1[0]}
                </Button.Answer>
                <Button.Answer
                  style={this.selectStyle[2]}
                  onClick={this.stil.bind(this, 3, a.answ2[1])}
                  correct={a.answ2[1]}
                  show={this.show}
                >
                  {a.answ2[0]}
                </Button.Answer>
                <Button.Answer
                  style={this.selectStyle[3]}
                  onClick={this.stil.bind(this, 4, a.answ3[1])}
                  correct={a.answ3[1]}
                  show={this.show}
                >
                  {a.answ3[0]}
                </Button.Answer>
              </AnswerCard>
              <br></br>
              <br></br>
            </div>
          ))}
        </div>

        <center>
          <Button.Submit
            onClick={() => {
              this.show = true;
              this.resultText = `You got ${this.points}/${this.totalPoints} correct answers`;
            }}
          >
            SUBMIT ANSWERS 🎉
          </Button.Submit>
          <br></br>
          <Card title={this.resultText}></Card>
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
    questionService
      .getQuizQuestion(this.id)
      .then((p) => (this.questions = p))
      .then(() => {
        this.randomizeOrder(this.questions);
      });
    categoryService.getAllCategories().then((c) => (this.categories = c));
  }
}
