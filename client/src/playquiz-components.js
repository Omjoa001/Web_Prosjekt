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

  sendPoints(pnt: number) {
    this.points += pnt;
  }
  //This randomizes the order of the answers in a given array of questions
  randomizeOrder(array: QuestionType[]) {
    this.questions.map((q) => {
      this.totalPoints += q.numCorrect;
    });
    let i = array.length - 1;
    for (i; i >= 0; i--) {
      let answOrder: Array<[string, number]> = [];
      answOrder.push(
        [array[i].answ0, 0],
        [array[i].answ1, 0],
        [array[i].answ2, 0],
        [array[i].answ3, 0]
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

  //This function randomizes the elements in any array.
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


  submit() {
  if (this.show) {
      return (
        <>
          <Row>
          <Column>
            <Button.Light onClick={() => history.push('/BrowseQuizzes')}>
              Back
            </Button.Light>
          </Column>
          <Column>
            <Column>
              <Button.Success onClick={() => window.location.reload(false)}>
                Play again!
              </Button.Success>
            </Column>
          </Column>
          <Column>
            <Button.Success onClick={() => history.push('/quiz/new')}>
              Create your own Quiz!!
            </Button.Success>
          </Column>
        </Row>
        </>
      )
    }
  }

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
              <AnswerCard
                title={a.question}
                answ0={a.answ0}
                answ1={a.answ1}
                answ2={a.answ2}
                answ3={a.answ3}
                show={this.show}
                parentCallback={this.sendPoints}
              >
                <div title={a.question}>
                  Correct answers: {a.numCorrect}
                  <br></br>
                </div>
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
          <Card title={this.resultText}>
            {this.submit()}
          </Card>
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
