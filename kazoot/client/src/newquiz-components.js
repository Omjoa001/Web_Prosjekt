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
          console.log(`questions: ${JSON.stringify(qs)}`);
          let tempQuestions: StateQuestionType[] = [];

          qs.forEach((q) => {
            let answerobjs: AnswerType[] = [];
            let tempQuestion: StateQuestionType = {};

            tempQuestion.id = q.id;
            tempQuestion.quizId = q.quizId;
            tempQuestion.questionText = q.question;

            console.log(`tempquestion id: ${tempQuestion.id}`);
            console.log(`tempquestion quizid: ${tempQuestion.quizId}`);
            console.log(`tempquestion questiontext: ${tempQuestion.questionText}`);

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

            console.log(`numCorrect: ${q.numCorrect}`);
            console.log(`answers: ${JSON.stringify(answers)}`);
            console.log(`correct: ${JSON.stringify(correct)}`);
            console.log(`incorrect: ${JSON.stringify(incorrect)}`);

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

            console.log(`answerobjs: ${JSON.stringify(answerobjs)}`);

            tempQuestion.answers = answerobjs;
            tempQuestions.push(tempQuestion);
          });

          console.log(`tempquestions: ${JSON.stringify(tempQuestions)}`);

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
  createQuiz() {
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
          console.log(`this.quiz.id: ${this.quiz.id}`);
          console.log(`this.quiz.title: ${this.quiz.title}`);
          console.log(`this.quiz.description: ${this.quiz.description}`);
          console.log(`this.quiz.categoryId: ${this.quiz.categoryId}`);
          quizService
            .updateQuiz(this.quiz.id, this.quiz.title, this.quiz.description, this.quiz.categoryId)
            .catch((error: Error) => Alert.danger('Error Editing Quiz: ' + error.message));
        } else if (this.mode == 'new') {
          console.log(`this.id: ${this.id}`);
          console.log(`this.title: ${this.title}`);
          console.log(`this.description: ${this.description}`);
          console.log(`this.categoryId: ${this.categoryId}`);
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
      console.log(`bef if edit quizId: ${quizId}`);
      if (this.mode == 'edit') quizId = this.quiz.id;
      console.log(`this.quiz.quizId: ${this.quiz.id}`);
      console.log(`after if edit quizId: ${quizId}`);

      let myPromise = new Promise((resolve, reject) => {
        console.log('myPromise ran');
        if (this.questionsCreated) {
          console.log('it ran the if');
          questionService.deleteQuestions(this.id).then(resolve());
        } else {
          console.log('it got to the else');
          resolve();
        }
      });

      myPromise.then(() => {
        if (numCorrect > 0) {
          console.log('quiz id in myprmoise: ' + quizId);
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
   * Save the quiz.
   * Displayed if mode is set to 'edit'.
   * TODO: Add then + catches
   */
  saveQuiz() {
    console.log('Saved quiz');
    console.log(JSON.stringify(this.quiz));

    // Deleting the existing quiz
    questionService.deleteQuestions(this.quiz.id);

    this.state.questions.forEach((question) => {
      let correct: string[] = [];
      let incorrect: string[] = [];
      let answ0: string = '';
      let answ1: string = '';
      let answ2: string = '';
      let answ3: string = '';

      // Sort the answers based on correctness
      question.answers.forEach((answer) => {
        if (answer.correct) correct.push(answer.answerText);
        else incorrect.push(answer.answerText);
      });

      let numCorrect: number = correct.length;
      let allAnswers: string[] = correct.concat(incorrect);

      for (let i = 0; i < allAnswers.length; i++) {
        if (!allAnswers[i]) allAnswers[i] = '';
      }

      answ0 = allAnswers[0];
      answ1 = allAnswers[1];
      answ2 = allAnswers[2];
      answ3 = allAnswers[3];

      console.log(`correct: ${JSON.stringify(correct)}`);
      console.log(`incorrect: ${JSON.stringify(incorrect)}`);
      console.log(`allAnswers: ${JSON.stringify(allAnswers)}`);

      console.log('Info to use when creating question:');
      console.log(`this.quiz.id: ${this.quiz.id}`);
      console.log(`question.questionText: ${question.questionText}`);
      console.log(`answ0: ${answ0}`);
      console.log(`answ1: ${answ1}`);
      console.log(`answ2: ${answ2}`);
      console.log(`answ3: ${answ3}`);
      console.log(`numCorrect: ${JSON.stringify(numCorrect)}`);

      questionService.createQuestion(
        this.quiz.id,
        question.questionText,
        answ0,
        answ1,
        answ2,
        answ3,
        numCorrect
      );
    });

    // quizservice update
    console.log('quizservice update call info:');
    console.log(`this.quiz.id: ${this.quiz.id}`);
    console.log(`this.quiz.title: ${this.quiz.title}`);
    console.log(`this.quiz.description: ${this.quiz.description}`);

    quizService
      .updateQuiz(this.quiz.id, this.quiz.title, this.quiz.description, this.quiz.categoryId)
      .then((id) => history.push('/listQuizzes'))
      .catch((error: Error) => Alert.danger('Error Editing Quiz: ' + error.message));
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
   * Render troubleshooting information about quiz and question state by setting debug variable
   */
  renderStateInfo() {
    let debug = false;
    if (debug)
      return (
        <Card title="QuizEditor's state">
          <div>
            <div>quiz title: {this.title}</div>
            <div>category: {this.categoryId}</div>
            <div>quiz id: {this.id}</div>
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

  /**
   * Generate buttons based on mode
   */
  theButton() {
    if (this.mode == 'new') {
      return (
        <Row>
          <Button.Submit
            onClick={() => {
              this.createQuiz();
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
                this.createQuiz();
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

        {this.renderStateInfo()}

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
}
