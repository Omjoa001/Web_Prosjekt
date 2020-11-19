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

  loadQuiz() {
    quizService.getQuiz(this.id).then((q) => {
      this.quiz = q;
      this.title = q.title;
      this.description = q.description;
      //this.categoryId = q.categoryId;

      questionService.getQuizQuestion(this.id).then((questions) => {
        let tempQuestions: StateQuestionType[] = [];

        questions.forEach((q) => {
          let answerobjs: AnswerType[] = [];
          let tempQuestion: StateQuestionType = {};

          tempQuestion.id = q.id;
          tempQuestion.quizId = q.quizId;
          tempQuestion.questionText = q.question;

          // Stores string value of all answers
          let answers: string[] = [];
          answers.push(q.answ0);
          answers.push(q.answ1);
          answers.push(q.answ2);
          answers.push(q.answ3);

          // Used to sort answer texts based on correctness
          let correct: string[] = [];
          let incorrect: string[] = [];

          // The first 'numCorrect' answer texts are correct
          for (let i = 0; i < q.numCorrect; i++) {
            correct.push(answers[i]);
          }

          // The rest are incorrect
          for (let i = q.numCorrect; i < answers.length; i++) {
            incorrect.push(answers[i]);
          }

          // Create answer objects to be stored in state
          correct.forEach((ans) => {
            answerobjs.push({
              answerText: ans,
              correct: true,
            });
          });

          incorrect.forEach((ans) => {
            answerobjs.push({
              answerText: ans,
              correct: false,
            });
          });

          tempQuestion.answers = answerobjs;
          tempQuestions.push(tempQuestion);
        });

        console.log(`loadquiz tempqs: ${JSON.stringify(tempQuestions)}`);
        this.setState({ questions: tempQuestions });
        console.log(`loadquiz state qs: ${JSON.stringify(this.state.questions)}`);
        this.ready = true;

        categoryService.getAllCategories().then((c) => {
          this.categories = c;
        });
      });
    });
  }



  render() {
    return (
      <>
        <CenterCard title={this.quiz.title}>
          {this.quiz.description}
          <br></br>
          <br></br>
        </CenterCard>
      </>
    );
  }

  mounted() {
    this.id = this.props.match.params.id;
    loadQuiz();
  }
}
