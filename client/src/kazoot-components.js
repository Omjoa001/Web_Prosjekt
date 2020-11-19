// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import {
  Card,
  CenterCard,
  TileCard,
  QuestionCard,
  LayoutCenter,
  Row,
  Button,
  Form,
  Column,
  Alert,
  NavBar,
} from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { BrowseQuizzes } from './browsequizzes-components';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
} from './kazoot-service';

const history = createHashHistory();

export class Home extends Component {
  render() {
    return (
      <>
        <LayoutCenter title="Welcome">
          <div className="font-italic">To Kazoot - our Quiz App 🔥 </div> <br></br>
          <h4>
            <small className="font-italic, text-muted">
              Browse through playable quizzes <br></br>
              by clicking on "Browse Quiz", <br></br>
              or create a brand new quiz by clicking on "New Quiz"!
            </small>
          </h4>
        </LayoutCenter>

        <Card>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button.Start onClick={() => history.push('/BrowseQuizzes')}>
            🔍 Browse Quizzes{' '}
          </Button.Start>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button.Start onClick={() => history.push('/quiz/new')}> ➕ New Quiz</Button.Start>
        </Card>
      </>
    );
  }
}

/**
 * "Generic" interface for creating or editing quizzes
 * It's functionality is determined based on props.
 * The 'mode' prop _must_ be set to 'edit' or 'new'.
 */
export class QuizEditor extends Component {
  cardtitle: string = ''; // Title displayed in render
  title: string = ''; // Title of quiz
  id: number = 0; // Quiz id
  description: string = ''; // Quiz description
  categoryId: number = 0;
  nextQuestionId: number = 1; // "local" ID used for indexing
  categories: CategoryType[] = []; // Categories in combobox
  mode: string = ''; // 'new' quiz mode or 'edit' quiz mode (mandatory!)
  quiz: QuizType = {}; // Quiz object to edit in 'edit' mode
  quizCreated: boolean = false; // Determines which database calls to run
  questionsCreated: boolean = false; // Determines which database calls to run
  safeToSave: boolean = false; // Prevents the user from saving if necessary information is missing

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

  mounted() {
    this.cardtitle = this.props.cardtitle;
    this.mode = this.props.mode;

    if (this.mode == 'edit') {
      this.loadQuiz();
    } else if (this.mode == 'new') {
      quizService.getNextId().then((next) => (this.id = next[0].AUTO_INCREMENT));
    }

    categoryService.getAllCategories().then((cats) => (this.categories = cats));
  }

  /**
   * Loads an existing quiz into state.
   * Only runs in 'edit' mode.
   */
  loadQuiz() {
    this.id = this.props.id;

    // Retrieve quiz from database
    console.log(`this.id before getquiz: ${this.id}`);
    if (this.id != 0) {
      quizService.getQuiz(this.id).then((quiz) => {
        this.quiz = quiz;
        this.title = quiz.title;
        this.description = quiz.description;
        this.categoryId = quiz.categoryId;

        // Retrieve all questions for quiz from database
        questionService.getQuizQuestion(this.id).then((qs) => {
          let tempQuestions: StateQuestionType[] = [];

          qs.forEach((q) => {
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

          this.setState({ questions: tempQuestions });
          this.quizCreated = true;
          this.questionsCreated = true;
        });
      });
    }
  }

  /**
   * Returns a new, locally unique question ID.
   * This is used for getting indexes etc, not for database calls.
   */
  getNewId() {
    return this.nextQuestionId++;
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
   * This is passed as a callback function to a question component.
   * When called in the question comp, it sends all of its information
   * back to the NewQuiz comp and changes NewQuiz' state.
   * NewQuiz needs this information to make database calls to create a new quiz.
   */
  sendData(id: number, quizId: number, questionText: string, answers: AnswerType[]) {
    let newarray: StateQuestionType[] = this.state.questions;
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
   * Removes a question with a given ID from the questions array.
   * This is passed as a callback function to each question component, so that
   * the remove question button can be rendered by the question component.
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
   * Create a new quiz or save an existing one.
   * Behavior is determined by mode and other factors.
   */
  saveQuiz() {
    console.log(`savequiz this.title: ${this.title}`);
    console.log(`savequiz this.description: ${this.description}`);
    console.log(`savequiz this.categoryId: ${this.categoryId}`);

    if (this.title != '' && this.categoryId != 0) {
      if (this.state.questions.length > 0) {
        if (!this.quizCreated) {
          quizService
            .createQuiz(this.title, this.description, this.categoryId)
            .then((res) => {
              this.quizCreated = true;
              this.safeToSave = true;
            })
            .catch((error) => {
              Alert.danger('Error: ' + error.message);
            });
        } else {
          quizService
            .updateQuiz(this.id, this.title, this.description, this.categoryId)
            .then(() => (this.safeToSave = true))
            .catch((error: Error) =>
              Alert.danger(
                'Error ' + (mode == 'edit') ? 'editing' : 'creating' + ' Quiz: ' + error.message
              )
            );
        }
      } else {
        Alert.danger('Quiz contains no questions');
      }
    } else {
      Alert.danger('Quiz is missing title or category');
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

      // Kind of ugly, but it forces the program to wait for the questions to be deleted
      let waitForDeletion = new Promise((resolve, reject) => {
        if (this.questionsCreated) {
          questionService.deleteQuestions(this.id).then(resolve());
        } else {
          resolve();
        }
      });

      waitForDeletion.then(() => {
        if (numCorrect > 0) {
          if (question.questionText != '') {
            if (this.quizCreated && this.safeToSave) {
              questionService
                .createQuestion(
                  quizId,
                  question.questionText,
                  answ0,
                  answ1,
                  answ2,
                  answ3,
                  numCorrect
                )
                .then(() => {
                  Alert.success('Quiz saved successfully');
                  history.push('/BrowseQuizzes');
                })
                .catch((error) => {
                  Alert.danger('Error: ' + error.message);
                });
            }
          } else {
            Alert.danger('A question is missing its text');
          }
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
              onChange={(event) => {
                this.title = event.currentTarget.value;
                this.forceUpdate();
              }}
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
              onChange={(event) => {
                this.categoryId = parseInt(event.currentTarget.value);
                this.forceUpdate();
              }}
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
          <Column width={3}>Quiz-description:</Column>
          <Column>
            <Form.Textarea
              placeholder="Quiz description"
              type="text"
              value={this.description}
              onChange={(event) => {
                this.description = event.currentTarget.value;
                this.forceUpdate();
              }}
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
