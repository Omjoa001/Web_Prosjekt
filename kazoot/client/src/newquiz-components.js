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
  type StateQuestionType,
} from './kazoot-service';

const history = createHashHistory();

/**
 * Component which renders the New Quiz page.
 * This component stores an array of question objects in its state.
 * These question objects are used to create question components,
 * which render the information stored in them.
 * These question components receive callbacks to update the parent's state as props.
 */
export class NewQuiz extends Component {
  render() {
    return (
      <>
        <QuizEditor cardtitle="📣 Creating a new quiz! 📣" mode="new" />
      </>
    );
  }
}

/**
 * "Generic" interface for creating or editing quizzes
 * It's functionality is determined based on props and callback functions passed to it.
 * The 'mode' prop _must_ be set to 'edit' or 'new'.
 */
export class QuizEditor extends Component {
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

  title: string = ''; // Title of quiz
  cardtitle: string = ''; // Title displayed in render
  description: string = '';
  categoryId: number = 0;
  // nextId: number = 0; // new quiz
  id: number = 0;
  nextQuestionId: number = 1; // "local" ID used for indexing
  categories: CategoryType[] = [];
  mode: string = ''; // 'new' quiz mode or 'edit' quiz mode (mandatory!)
  quiz: QuizType = {}; // Quiz to edit in 'edit' mode
  quizCreated: boolean = false;
  questionsCreated: boolean = false;

  mounted() {
    this.cardtitle = this.props.cardtitle;
    this.mode = this.props.mode;

    console.log(`${this.mode} mode`);

    if (this.mode == 'edit') {
      this.loadQuiz();
    } else if (this.mode == 'new') {
      quizService.getNextId().then((next) => (this.id = next[0].AUTO_INCREMENT));
    }

    categoryService.getAllCategories().then((cats) => (this.categories = cats));
  }

  /**
   * Loads an existing quiz into state.
   */
  loadQuiz() {
    this.id = this.props.id;
    this.quizCreated = true;
    this.questionsCreated = true;
    quizService.getQuiz(this.id).then((q) => {
      this.quiz = q;
      console.log(JSON.stringify(this.quiz));

      this.title = q.title;
      this.description = q.description;
      this.categoryId = q.categoryId;

      questionService.getQuizQuestion(this.id).then((qs) => {
        let tempQuestions: StateQuestionType[] = [];

        qs.forEach((q) => {
          let answerobjs: AnswerType[] = [];
          let tempQuestion: StateQuestionType = {};

          tempQuestion.id = q.id;
          tempQuestion.quizId = q.quizId;
          tempQuestion.questionText = q.question;

          // Stores string value of all answers
          // TODO: Add support for more answers
          let answers: string[] = [];
          answers.push(q.answ0);
          answers.push(q.answ1);
          answers.push(q.answ2);
          answers.push(q.answ3);

          let correct: string[] = [];
          let incorrect: string[] = [];

          for (let i = 0; i < q.numCorrect; i++) {
            console.log(i);
            correct.push(answers[i]);
            console.log(answers[i]);
          }

          for (let i = q.numCorrect; i < answers.length; i++) {
            console.log(i);
            incorrect.push(answers[i]);
            console.log(answers[i]);
          }

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

        this.setState({ questions: tempQuestions });
      });
    });
  }

  /**
   * Returns a new, unique question ID.
   */
  getNewId() {
    return this.nextQuestionId++;
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
      newarray[index].quizId = this.id;
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
   * Renders all the questions stored in state
   */
  renderQuestions() {
    // Array of JSX elements to return
    let jsx: [] = [];

    // TODO: this one could probably receive an object
    let i = 1;
    this.state.questions.map((q) => {
      jsx.push(
        <>
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
          <br></br>
        </>
      );
      i++;
    });

    return jsx;
  }

  /**
   * Returns an empty question object
   */
  newQuestionObject() {
    let newQuestion: StateQuestionType = {};
    newQuestion.id = this.getNewId();
    newQuestion.quizId = this.id;
    newQuestion.questionText = '';
    newQuestion.answers = [
      { answerText: '', correct: false },
      { answerText: '', correct: false },
      { answerText: '', correct: false },
      { answerText: '', correct: false },
    ];

    return newQuestion;
  }

  /**
   * Replaces the questions array in state with a new one containing a new question object
   */
  addNewQuestionToState() {
    let newQuestion = this.newQuestionObject();
    let newArray = this.state.questions;
    newArray.push(newQuestion);
    this.setState({ questions: newArray });
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
   * Create a new quiz.
   * Displayed if mode is set to 'new'
   */
  saveQuiz() {
    if (this.state.questions.length > 0) {
      if (!this.quizCreated) {
        quizService
          .createQuiz(this.title, this.description, this.categoryId)
          .then((res) => {
            this.quizCreated = true;
          })
          .catch((error) => {
            Alert.danger('Error: ' + error.message);
          });
      } else {
        if (this.mode == 'edit') {
          quizService
            .updateQuiz(this.quiz.id, this.quiz.title, this.quiz.description, this.quiz.categoryId)
            .catch((error: Error) => Alert.danger('Error Editing Quiz: ' + error.message));
        } else if (this.mode == 'new') {
          quizService
            .updateQuiz(this.id, this.title, this.description, this.categoryId)
            .catch((error: Error) => Alert.danger('Error creating Quiz: ' + error.message));
        }
      }
    } else {
      Alert.danger('Quiz contains no questions');
    }

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

      answ0 = allAnswers[0];
      answ1 = allAnswers[1];
      answ2 = allAnswers[2];
      answ3 = allAnswers[3];

      let quizId: number = question.quizId;
      if (this.mode == 'edit') quizId = this.quiz.id;

      let myPromise = new Promise((resolve, reject) => {
        if (this.questionsCreated) {
          questionService.deleteQuestions(this.id).then(resolve());
        } else {
          resolve();
        }
      });

      myPromise.then(() => {
        if (numCorrect > 0) {
          questionService
            .createQuestion(quizId, question.questionText, answ0, answ1, answ2, answ3, numCorrect)
            .then(() => {
              Alert.success('Quiz saved successfully');
              history.push('/BrowseQuizzes');
            })
            .catch((error) => {
              Alert.danger('Error: ' + error.message);
            });
        } else {
          Alert.danger('Please add at least one correct answer for each question');
        }
      });
    });
  }

  /**
   * Delete the quiz (edit mode)
   */
  deleteQuiz() {
    questionService
      .deleteQuestions(this.quiz.id)
      .catch((error: Error) => Alert.danger('Error deleting Questions: ' + error.message));

    quizService
      .deleteQuiz(this.quiz.id)
      .then((id) => history.push('/BrowseQuizzes'))
      .catch((error: Error) => Alert.danger('Error deleting Quiz: ' + error.message));
  }

  /**
   * Displays editable information about the quiz.
   */
  renderQuizInfo() {
    return (
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

          <Column left>
            <select
              name="Category"
              value={this.categoryId}
              onChange={(event) => (this.categoryId = event.currentTarget.value)}
            >
              <option value="0">Choose a category</option>
              {this.categories.map((cat) => {
                return <option value={cat.id}>{cat.category}</option>;
              })}
            </select>
          </Column>
        </Row>
        <br></br>
        <Row>
          {/* TODO: Remove this?  */}
          <Column width={3}>Quiz-Id:</Column>
          <Column>
            <Form.Input value={this.id} disabled></Form.Input>
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
  }

  /**
   * Generate buttons based on mode
   */
  theButton() {
    if (this.mode == 'new') {
      return (
        <Row>
          <Button.Submit
            onClick={() => {
              this.saveQuiz();
            }}
          >
            🔥 Create Quiz 🔥
          </Button.Submit>
        </Row>
      );
    } else if (this.mode == 'edit') {
      return (
        <>
          <Row>
            <Button.Submit
              onClick={() => {
                this.saveQuiz();
              }}
            >
              🔥 Save Quiz 🔥
            </Button.Submit>
          </Row>
          <br></br>
          <center>
            <Row>
              <Column>
                <Button.Danger
                  onClick={() => {
                    this.deleteQuiz();
                  }}
                >
                  ☠ Delete Quiz ☠
                </Button.Danger>
              </Column>
            </Row>
          </center>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <center>
          <Column width={10}>
            <Card title={this.cardtitle}>{this.renderQuizInfo()}</Card>
          </Column>
        </center>

        <center>{this.renderQuestions()}</center>

        <br></br>

        <Row>
          <Button.Submit
            onClick={() => {
              this.addNewQuestionToState();
            }}
          >
            ➕ Add Question
          </Button.Submit>
        </Row>
        {this.theButton()}
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
            <Column width={1}>
              <Button.Back onClick={this.removeButton}>X</Button.Back>
            </Column>
          </Row>
          <br></br>
          {this.renderAnswers()}
        </QuestionCard>
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
}
