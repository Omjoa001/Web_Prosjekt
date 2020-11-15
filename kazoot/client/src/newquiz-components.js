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

/**
 * Component which renders the New Quiz page.
 *
 * TODO: maybe rename question id to index or something to diff it from db id
 */
export class NewQuiz extends Component {
  // This makes flow happy
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

  title: string = '';
  description: string = '';
  categoryId: number = 0;
  nextId: number = 0;
  nextQuestionId: number = 1; // Only used for indexing

  mounted() {
    quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
  }

  /**
   *
   * TODO: Make it work on an array of question objects.
   */
  sendData(id, quizId, questionText, answers) {
    let newarray = this.state.questions;
    let index = this.findIndexOfQuestion(id);
    if (index != -1) {
      newarray[index].questionText = questionText;
      newarray[index].quizId = this.nextId;
      newarray[index].id = id;
      newarray[index].answers = answers;
      this.setState({ questions: newarray });
    } else {
      console.log('error');
    }
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
          sendData={(id, quizId, questionText, answers) => {
            this.sendData(id, quizId, questionText, answers);
          }}
          removeQuestion={(id) => {
            this.removeQuestion(id);
          }}
        />
      );
    });

    return jsx;
  }

  /**
   * Returns a new question id.
   * This has nothing to do with the question id in the database,
   * it is only used for indexing in this component.
   */
  getNewId() {
    return this.nextQuestionId++;
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
  removeQuestion(id: number) {
    let index = this.findIndexOfQuestion(id);
    let newQuestions = this.state.questions;
    if (index != -1) {
      newQuestions.splice(index, 1);
    } else {
      console.log(`Could not remove question with id ${id}`);
    }

    this.setState({ questions: newQuestions });
    console.log(`removeQuestion state questions: ${this.state.questions}`);
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

  /**
   * WIP
   * Create a new quiz.
   */
  createQuiz() {
    // this.state.questions.forEach((question));
  }

  /**
   * Displays editable information about the quiz.
   */
  renderQuizInfo() {
    let jsx: [] = [];

    jsx.push(
      <Card>
        <Row>
          <Column width={3}>Quiz-title:</Column>
          <Column>
            <Form.Input
              placeholder="Quiz title"
              type="text"
              value={this.title}
              onChange={(event) => (this.title = event.currentTarget.value)}
            ></Form.Input>
            <br></br>
          </Column>
        </Row>
        <Row>
          <Column width={3}>Quiz-Category:</Column>
          <Column>
            <select
              name="Category"
              value={this.categoryId}
              onChange={(event) => (this.categoryId = event.currentTarget.value)}
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
            <Form.Input value={this.nextId} disabled></Form.Input>
            <br></br>
          </Column>
        </Row>
        <Row>
          <Column width={3}>Quiz-description:</Column>
          <Column>
            <Form.Textarea
              placeholder="Quiz description"
              type="text"
              value={this.description}
              onChange={(event) => (this.description = event.currentTarget.value)}
              row={10}
            ></Form.Textarea>
          </Column>
        </Row>
      </Card>
    );

    return jsx;
  }

  render() {
    return (
      <>
        <Card title="New Quiz!">{this.renderQuizInfo()}</Card>

        <Button.Success
          onClick={() => {
            this.forceUpdate();
          }}
        >
          Update state
        </Button.Success>

        <Button.Success
          onClick={() => {
            this.createQuiz();
          }}
        >
          Create Quiz
        </Button.Success>

        <Button.Success
          onClick={() => {
            console.log(`clicked addQuestion`);
            this.addNewQuestionToState();
          }}
        >
          Add New Question
        </Button.Success>

        {/* troubleshooting info */}
        {/* TODO: remove */}
        <Card title="NewQuiz's state">
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

  // Sends its props back to the NewQuiz component
  updateParentState() {
    this.props.sendData(this.id, this.quizId, this.questionText, this.answers);
  }

  // Click handler for remove question button
  removeButton() {
    this.props.removeQuestion(this.id);
  }

  /**
   * TODO: Add number of correct answers to the first column
   */
  render() {
    return (
      <>
        <Card title={this.title}>
          <Button.Success onClick={this.updateParentState}>Update State</Button.Success>
          <Button.Danger onClick={this.removeButton}>Remove Question</Button.Danger>
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
