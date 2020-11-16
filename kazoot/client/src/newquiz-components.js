// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, QuestionCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
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
 * This component stores an array of question objects in its state.
 * These question objects are used to create question components,
 * which render the information stored in them.
 * These question components receive callbacks to update the parent's state as props.
 *
 * TODO: maybe rename question id to index or something to diff it from db id
 */
export class NewQuiz extends Component {
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

  title: string = '';
  description: string = '';
  categoryId: number = 0;
  nextId: number = 0;
  nextQuestionId: number = 1; // Only used for indexing

  mounted() {
    quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
  }

  /**
   * This is passed as a callback function to a question component.
   * When called in the question comp, it sends all of its information
   * back to the NewQuiz comp and changes NewQuiz' state.
   * NewQuiz needs this information to make database calls to create a new quiz.
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
      console.log(`sendData: Question with id ${id} not found`);
    }
  }

  /**
   * Removes a question from the questions array.
   * This is passed as a callback function to each question component, so that
   * the remove question button can be rendered by the question component.
   * @param id - ID of question to remove
   * Warning: Manipulates state
   */
  removeQuestion(id: number) {
    let index = this.findIndexOfQuestion(id);
    let newQuestions = this.state.questions;
    if (index != -1) {
      newQuestions.splice(index, 1);
    } else {
      console.log(`removeQuestion: Could not remove question with id ${id}`);
    }

    this.setState({ questions: newQuestions });
  }

  /**
   * Renders each question.
   * TODO: Removequestion doesn't need to be a callback. Render the remove button from newquiz.
   */
  renderQuestions() {
    // Array of JSX elements to return
    let jsx: [] = [];

    // TODO: this one could probably receive an object
    let i = 1;
    this.state.questions.map((q) => {
      jsx.push(
        <Question
          id={q.id}
          quizId={q.quizId}
          title={`Question ${i}`}
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
      i++;
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
    quizService.createQuiz(this.title, this.description, this.categoryId);

    this.state.questions.forEach((question) => {
      let correct: string[] = [];
      let incorrect: string[] = [];
      let answ0: string = '';
      let answ1: string = '';
      let answ2: string = '';
      let answ3: string = '';

      question.answers.forEach((answer) => {
        if (answer.correct) correct.push(answer.answerText);
        else incorrect.push(answer.answerText);
      });

      let numCorrect: number = correct.length;
      let allAnswers: string[] = correct.concat(incorrect);

      console.log(`correct: ${correct}`);
      console.log(`incorrect: ${incorrect}`);
      console.log(`allAnswers: ${allAnswers}`);

      answ0 = allAnswers[0];
      answ1 = allAnswers[1];
      answ2 = allAnswers[2];
      answ3 = allAnswers[3];

      console.log(`answ0: ${answ0}`);
      console.log(`answ1: ${answ1}`);
      console.log(`answ2: ${answ2}`);
      console.log(`answ3: ${answ3}`);
      console.log(`numcorrect: ${numcorrect}`);

      questionService.createQuestion(
        question.quizId,
        question.questionText,
        answ0,
        answ1,
        answ2,
        answ3,
        numCorrect
      );
    });
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
          </Column>
        </Row>
        <br></br>
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
        <br></br>
        <Row>
          <Column width={3}>Quiz-Id:</Column>
          <Column>
            <Form.Input value={this.nextId} disabled></Form.Input>
          </Column>
        </Row>
        <br></br>
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

  /**
   * Render troubleshooting information about quiz and question state by setting debug variable
   */
  renderStateInfo() {
    let debug = false;
    if (debug)
      return (
        <Card title="NewQuiz's state">
          <div>
            <div>quiz title: {this.title}</div>
            <div>category: {this.categoryId}</div>
            <div>quiz id: {this.nextId}</div>
            <div>quiz desc: {this.description}</div>
          </div>
          {this.state.questions.map((question) => {
            return (
              <>
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
              </>
            );
          })}
        </Card>
      );
  }

  render() {
    return (
      <>
        <Card title="Creating a new quiz!">{this.renderQuizInfo()}</Card>

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

        {this.renderStateInfo()}

        {this.renderQuestions()}
      </>
    );
  }
}

/**
 * Renders a single question
 */
export class Question extends Component {
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
            this.updateParentState();
          }}
        ></Form.Input>
        <br></br>
      </>
    );
  }

  /**
   * Callback function to update NewQuiz' state with data from this question
   */
  updateParentState() {
    this.props.sendData(this.id, this.quizId, this.questionText, this.answers);
  }

  /**
   * Callback function to remove this question from NewQuiz' state
   */
  removeButton() {
    this.props.removeQuestion(this.id);
  }

  /**
   * Generates each answer with checkbox etc.
   * @return - array of JSX elements to be rendered in render()
   * TODO: Make it possible to add or remove answers.
   */
  renderAnswers() {
    let jsx: [] = [];

    let i = 1;
    this.answers.forEach((answer) => {
      jsx.push(
        <Row>
          <Column width={2}>
            <Form.Checkbox
              checked={answer.correct}
              onChange={(event) => {
                answer.correct = event.target.checked;
                this.updateParentState();
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
                this.updateParentState();
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
    this.title = this.props.title;
    this.questionText = this.props.questionText;
    this.answers = this.props.answers;
  }


  render() {
    return (
      <>
        <QuestionCard title={this.title}>
          <Row>
            <Column width={2}>Question: {}</Column>
            <Column>
            <Form.Input
              placeholder="Question text"
              value={this.questionText}
              onChange={(event) => {
                this.questionText = event.currentTarget.value;
                this.updateParentState();
              }}
            ></Form.Input>
            </Column>
            <br></br>
            <Column width={1}>
              <Button.Back onClick={this.removeButton}>X</Button.Back>
            </Column>
          </Row>
          {this.renderAnswers()}
        </QuestionCard>
      </>
    );
  }
}
