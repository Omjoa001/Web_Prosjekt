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

/*BRAINSTORMING*/
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
  // ...


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
 * TODO: Add database call for categories, etc.
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
}
