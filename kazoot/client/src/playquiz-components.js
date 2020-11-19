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
  show: boolean = false;
  shuffledQuestions: QuestionType[] = [];
  points: number = 0;
  totalPoints: number = 0;
  resultText: string = '';
  ready: boolean = false; // Quiz + questions loaded or not

  // This should make flow happy
  state: {
    questions: StateQuestionType[],
  };

  // Necessary for manipulating NewQuiz' state in the Question components
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  sendPoints(pnt) {
    this.points += pnt;
  }

  randomizeOrder(array: QuestionType[]) {
    this.questions.map((q) => {
      this.totalPoints += q.numCorrect;
    });
    let i = array.length - 1;
    for (i; i >= 0; i--) {
      let answOrder = [];
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

  render() {
    if (this.ready) {
      return (
        <>
          <Card title="Testing wack stuff">
            <AnswerCardComp question={this.state.questions[0]} />
          </Card>

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
              SUBMIT ANSWERS
            </Button.Submit>
            <br></br>
            <Card title={this.resultText}></Card>
          </center>
          <br></br>
          <br></br>
          <br></br>
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
  mounted() {
    this.id = this.props.match.params.id;
    this.loadQuiz();

    //quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
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
}

export class AnswerCardComp extends Component {
  question: StateQuestionType = {};
  show: boolean = false;

  mounted() {
    this.question = this.props.question; // TODO: Change this
    console.log(`acc question: ${JSON.stringify(this.question)}`);
    this.question.answers.forEach((ans) => {
      ans.clicked = false;
    });
  }

  renderAnswers() {
    question.answers.forEach((ans) => {
      let buttonclass: string = '';
      if (show) {
        let value = this.props.correct ? 'success' : 'danger';
        buttonclass = 'btn btn-' + value + 'btn btn-outline-primary btn-lg btn-block';
      } else {
        if (ans.clicked) {
          buttonclass = 'btn btn-primary';
        } else {
          buttonclass = 'btn btn-outline-primary';
        }
      }
      return (
        <>
          <Button.Custom
            onClick={() => {
              ans.clicked = !ans.clicked;
            }}
            buttonclass={buttonclass}
          ></Button.Custom>
        </>
      );
    });
  }

  render() {
    return (
      <>
        <center>
          <Card title={this.props.question.questionText}>
            {this.renderAnswers}
            <Button.Success>Test</Button.Success>
          </Card>
        </center>
      </>
    );
  }
}
