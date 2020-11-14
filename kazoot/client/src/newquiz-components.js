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

// TODO: maybe rename
type StateQuestionType = {
  id: number,
  quizId: number,
  questionText: string,
  answers: AnswerType[],
};

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
 * Component which renders the New Quiz page.
 */
export class NewQuiz extends Component {
  logMapElements(value, key, map) {
    console.log(`m[${key}] = ${value.quizId}`);
    console.log(`m[${key}] = ${value.questionText}`);
    value.answers.forEach((ans) => console.log(`m[${key}] = ${ans.answerText}`));
  }

  fun() {
    let map = new Map();
    let id = 1;
    map.set(id, {
      id: 1,
      quizId: 69,
      questionText: 'le mao',
      answers: [
        { answerText: 'woo', correct: false },
        { answerText: 'wee', correct: false },
        { answerText: 'wii', correct: false },
        { answerText: 'wyy', correct: false },
      ],
    });

    map.forEach(this.logMapElements);
  }

  // TODO: maybe rename question id to index or something to diff it from db id

  // This makes flow happy
  state: {
    questions: StateQuestionType[],
  };

  // Necessary for manipulating NewQuiz' state in the Question components
  constructor(props) {
    super(props);

    // This is designed for multiple questions
    // TODO: Maybe use a map, in order to update the correct question when adding multiple questions
    this.state = {
      questions: [
        {
          id: 1,
          quizId: 1,
          questionText: '',
          answers: [
            { answerText: '', correct: false },
            { answerText: '', correct: false },
            { answerText: '', correct: false },
            { answerText: '', correct: false },
          ],
        },
      ],
    };
  }

  title: string = '';
  description: string = '';
  categoryId: number = 0;
  nextId: number = 0;

  mounted() {
    quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
    this.fun();
  }

  // Callback function to be passed to Question component
  // TODO: Make it work on an array of question objects.
  // TODO: Replace 0 with actual ID
  // TODO: Convert list to map if necessary
  sendData(id, quizId, questionText, answers) {
    let newarray = this.state.questions;
    let index = this.state.questions.length - 1;
    console.log(`sendData: ${newarray[index].questionText}`);
    newarray[index].questionText = questionText;
    newarray[index].quizId = this.nextId;
    newarray[index].id = id;
    newarray[index].answers = answers;
    this.setState({ questions: newarray });
  }

  /**
   * Renders each question in the state
   */
  renderQuestions() {
    // Array of JSX elements to return
    let jsx: [] = [];

    // TODO: this one could probably receive an object
    this.state.questions.map((q) => {
      jsx.push(
        <Question
          id={q.id}
          quizId={q.quizId}
          title={q.title}
          questionText={q.questionText}
          answers={q.answers}
          parentCallback={(id, quizId, questionText, answers) => {
            this.sendData(id, quizId, questionText, answers);
          }}
        />
      );
    });

    return jsx;
  }

  // TODO: Find or make a database call to get a new id
  getNewId() {
    return this.state.questions.length + 1;
  }

  /**
   * Returns an empty question object
   */
  newQuestionObject() {
    console.log(`newQuestionObject() called`);
    let newQuestion: StateQuestionType = {};
    newQuestion.id = this.getNewId();
    newQuestion.quizId = this.nextId;
    newQuestion.questionText = '';
    newQuestion.answers = [
      { answerText: '', correct: false },
      { answerText: '', correct: false },
      { answerText: '', correct: false },
      { answerText: '', correct: false },
    ];

    console.log(`the new object: ${newQuestion}`);

    return newQuestion;
  }

  /**
   * Replaces the questions array in state with a new one containing a new question object
   * Warning: Manipulates state
   */
  addNewQuestionToState() {
    let newQuestion = this.newQuestionObject();
    let tempArray = this.state.questions;
    tempArray.push(newQuestion);
    this.setState({ questions: tempArray });
  }

  /**
   * Removes a question from the questions array
   * @param id - ID of question to remove
   * Warning: Manipulates state
   */
  removeQuestionFromState(id: number) {
    let index = this.findIndexOfQuestion(id);
    if (index != -1) {
      this.state.questions.splice(index, 1);
    }
  }

  /**
   * Finds the index of a question with a given ID
   */
  findIndexOfQuestion(id: number) {
    for (let i = 0; i < this.state.questions.length; i++) {
      if (this.state.questions[i].id == id) {
        return i;
      }
    }

    return -1;
  }

  render() {
    return (
      <>
        <Card title="New Quiz!">
          <QuizInfoCard
            title={this.title}
            description={this.description}
            categoryId={this.categoryId}
            nextId={this.nextId}
          ></QuizInfoCard>
        </Card>

        <Column></Column>
        <Button.Success
          onClick={() => {
            console.log(`clicked addQuestion`);
            this.addNewQuestionToState();
          }}
        >
          Add New Question
        </Button.Success>

        <Card title="NewQuiz's state">
          {/* proper render */}
          {this.state.questions.map((question) => {
            return (
              <div>
                <div>id: {question.id}</div>
                <div>quizId: {question.quizId}</div>
                <div>questionText: {question.questionText}</div>
                <div>
                  {question.answers.map((ans) => {
                    return (
                      <div>
                        answertext: {ans.answerText} | correct: {ans.correct ? 'true' : 'false'}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Card>

        {this.renderQuestions()}
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
            <br></br>
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
            <br></br>
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
    );
  }
}

/**
 * Renders a single question
 */
export class Question extends Component {
  // These are redefined in mounted fwiw
  title: string = '';
  questionText: string = '';
  answers: AnswerType[] = [];

  /*Separate from render to reduce clutter*/
  renderQuestionText() {
    return (
      <>
        <Form.Input
          placeholder="Question text"
          value={this.questionText}
          onChange={(event) => {
            this.questionText = event.currentTarget.value;
          }}
        ></Form.Input>
      </>
    );
  }

  /**
   * Generates each answer with checkbox etc.
   * The output varies based on how many answers there are for
   * a given question:
   */
  renderAnswers() {
    let jsx: [] = [];

    let i = 0;
    this.answers.forEach((answer) => {
      jsx.push(
        <Row>
          <Column width={2}>
            <Form.Checkbox
              checked={answer.correct}
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

  mounted() {
    this.id = this.props.id;
    this.quizId = this.props.quizId;
    this.title = 'New Question';
    this.questionText = this.props.questionText;
    this.answers = this.props.answers;
  }

  handleOnClick() {
    // console.log(this.answers);
    this.props.parentCallback(this.id, this.quizId, this.questionText, this.answers);
  }

  /**
   * TODO: Add number of correct answers to the first column
   */
  render() {
    return (
      <>
        <Card title={this.title}>
          <Button.Success onClick={this.handleOnClick}>Update State</Button.Success>
          <Row>
            <Column width={2}>Question: {}</Column>
            <Column> {this.renderQuestionText()} </Column>
          </Row>
          {this.renderAnswers()}
        </Card>
      </>
    );
  }
}
