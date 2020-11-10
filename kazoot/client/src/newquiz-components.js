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

const history = createHashHistory();

/**
 * Takes an array of questions and maps them in a JSX tag
 * TODO: Reconsider this. Does it make sense?
 */
export class QuestionList extends Component {
  listOfQuestions: Question = [];

  render() {
    return (
      <>
        {this.listOfQuestions.map((question) => {
          <div>{question.answers}</div>;
        })}
      </>
    );
  }
}

const Parent = () => {
  // All question props:
  //     title: string = '';
  //     questionText: string = '';
  //     correct: string[] = [];
  //     incorrect: string[] = [];
  //     numCorrect: number = 0;
  //     answers: AnswerType[] = [];
  // Absolutely necessary:
  //     questionText: string = '';
  //     correct: string[] = [];
  //     incorrect: string[] = [];
  // database call per question needs:
  // ans0, ans1, ans2, ans3
  //
};

const Child = () => {};

/**
 * Renders a single question
 */
export class Question extends Component {
  properties: [] = [];

  title: string = '';
  questionText: string = '';
  correct: string[] = [];
  incorrect: string[] = [];
  numCorrect: number = 0;
  answers: AnswerType[] = [];

  mounted() {
    console.log(this.properties);
  }

  // * Generates each answer with checkbox etc.
  // * The output varies based on how many answers there are for
  // * a given question:

  renderAnswers() {
    let jsx: [] = [];

    let i = 0;
    this.properties.answers.forEach((answer) => {
      jsx.push(
        <Row>
          <Column width={2}>
            <Form.Checkbox
              onChange={(event) => {
                answer.correct = event.target.checked;
                console.log(`answer.correct set to ${answer.correct}`);
              }}
            ></Form.Checkbox>
          </Column>
          <Column>
            <Form.Input
              placeholder={`answer ${i}`}
              value={answer.answerText}
              onChange={(event) => {
                answer.answerText = event.currentTarget.value;
              }}
            ></Form.Input>
          </Column>
        </Row>
      );
      i++;
    });

    return jsx;
  }

  /**
   * Add number of correct answers to the first column
   */
  render() {
    return (
      <>
        <Card title={this.properties.title}>
          <Row>
            <Column width={2}>Correct: {}</Column>
            <Column>
              <Form.Input
                placeholder="Question"
                value={this.properties.questionText}
                onChange={(event) => {
                  this.properties.questionText = event.currentTarget.value;
                }}
              ></Form.Input>
            </Column>
          </Row>
          {this.renderAnswers()}
        </Card>
      </>
    );
  }
}

/**
 * Component to render information about the quiz being created in NewQuiz
 */
export class QuizInfoCard extends Component {
  title: string = '';
  description: string = '';
  categoryId: number = 0;
  nextId: number = 0;

  render() {
    return (
      <Card title="New Quiz!">
        <Card>
          <Row>
            <Column width={3}>Quiz-title:</Column>
            <Column>
              <Form.Input
                placeholder="Quiz title"
                type="text"
                value={this.props.title}
                onChange={(event) => (this.props.title = event.currentTarget.value)}
              ></Form.Input>
            </Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-Category:</Column>
            <Column>
              <select
                name="Category"
                value={this.props.categoryId}
                onChange={(event) => (this.props.categoryId = event.currentTarget.value)}
              >
                <option value="0">Velg en kategori</option>
                <option value="1">Matte</option>
                <option value="2">Fotball</option>
                <option value="3">Geografi</option>
                <option value="4">It</option>
                <option value="5">History</option>
              </select>
            </Column>
          </Row>
          <Row>
            <Column>Quiz-Id:</Column>
            <Column>
              <Form.Input value={this.props.nextId} disabled></Form.Input>
            </Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-description:</Column>
            <Column>
              <Form.Textarea
                placeholder="Quiz description"
                type="text"
                value={this.props.description}
                onChange={(event) => (this.props.description = event.currentTarget.value)}
                row={10}
              ></Form.Textarea>
            </Column>
          </Row>
        </Card>
      </Card>
    );
  }
}

/**
 * Component which renders the New Quiz page.
 */
export class NewQuiz extends Component {
  title: string = '';
  description: string = '';
  categoryId: number = 0;
  nextId: number = 0;

  questions: QuestionType[] = [];

  render() {
    return (
      <>
        <QuizInfoCard
          title={this.title}
          description={this.description}
          categoryId={this.categoryId}
          nextId={this.nextId}
        ></QuizInfoCard>
      </>
    );
  }

  mounted() {
    quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
  }

  add() {
    if (this.newquestion.length >= 10) {
      console.log('stopppp');
      Alert.danger('shii');
    }
    this.id = this.id + 1;
    this.newquestion.push({
      id: this.id,
      question: '',
      answ0: '',
      answ1: '',
      answ2: '',
      answ3: '',
    });
  }

  createQuiz() {
    // console.log(oo.value)
    console.log(this.categoryId);
    quizService
      .createQuiz(this.title, this.description, this.categoryId)
      .then((id) => history.push('/tasks/' + id))
      .catch((error: Error) => Alert.danger('Error creating Quiz: ' + error.message));

    for (let i = 0; i < this.newquestion.length; i++) {
      console.log(this.newquestion[i]);
      questionService
        .createQuestion(
          this.nextId,
          this.newquestion[i].question,
          this.newquestion[i].answ0,
          this.newquestion[i].answ1,
          this.newquestion[i].answ2,
          this.newquestion[i].answ3
        )
        .catch((error: Error) => Alert.danger('Error creating Question: ' + error.message));
    }
  }

  delQuestion() {
    this.newquestion.splice(this.index, 1);
  }
}
