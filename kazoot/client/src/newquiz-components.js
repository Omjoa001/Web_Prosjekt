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



export class NewQuizQuestionList extends Component {
  listOfQuestions: NewQuizQuestion = [];

  render() {
    return (
      <>
        {this.listOfQuestions.map((question) => {
          <div>
            {question.answers}
          </div>
        })}
      </>
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

  // placeholderQuestion: QuestionType = {
  //   id,
  // };

  newquestion: Array<{
    id: number,
    question: string,
  }> = [
    {
      id: 0,
      question: '',
      answ0: {
        id: 0,
        ans: '',
        bool: false,
      },
      answ1: {
        id: 0,
        ans: '',
        bool: false,
      },
      answ2: {
        id: 0,
        ans: '',
        bool: false,
      },
      answ3: {
        id: 0,
        ans: '',
        bool: false,
      },
    },
  ];

  listOfQuestions: NewQuizQuestion[] = [
    (
      <NewQuizQuestion title="Question 1"/>
    )
  ];


  theButton: Button.Success = (
    <Button.Success
      onClick={() => {
        console.log("prøver å legge til shit");
        this.listOfQuestions.push(<NewQuizQuestion title="heisann"></NewQuizQuestion>);
        console.log(`listofquestions: ${this.listOfQuestions}`);
      }}
    >
      hei
    </Button.Success>
  );

  render() {
    return (
      <>
        <>
          <NewQuizInfoCard
            title={this.title}
            description={this.description}
            categoryId={this.categoryId}
            nextId={this.nextId}
          ></NewQuizInfoCard>

          {this.theButton}

          <NewQuizQuestionList questionlist={this.listOfQuestions}/>

          {this.newquestion.map((q, index) => (
            <Card key={q.id} title={'Spørsmål ' + (index + 1)}>
              <Row>
                <Column width={2}>Riktig: {q.id}</Column>
                <Column>
                  <Form.Input
                    placeholder="Question"
                    value={q.question}
                    onChange={(event) => (q.question = event.currentTarget.value)}
                  ></Form.Input>
                </Column>
                <Column>{/*<Button.Danger onClick={() => {}}>X</Button.Danger>*/}</Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Checkbox></Form.Checkbox>
                </Column>
                <Column>
                  <Form.Input
                    placeholder="Answer 1"
                    value={q.answ0}
                    onChange={(event) => (q.answ0 = event.currentTarget.value)}
                  ></Form.Input>
                </Column>
                <Column>{/*<Button.Danger>X</Button.Danger>*/}</Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Checkbox></Form.Checkbox>
                </Column>
                <Column>
                  <Form.Input
                    placeholder="Answer 2"
                    onChange={(event) => (q.answ1 = event.currentTarget.value)}
                    value={q.answ1}
                  ></Form.Input>
                </Column>
                <Column>{/*<Button.Danger>X</Button.Danger>*/}</Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Checkbox></Form.Checkbox>
                </Column>
                <Column>
                  <Form.Input
                    placeholder="Answer 3"
                    value={q.answ2}
                    onChange={(event) => (q.answ2 = event.currentTarget.value)}
                  ></Form.Input>
                </Column>
                <Column>{/*<Button.Danger>X</Button.Danger>*/}</Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Checkbox></Form.Checkbox>
                </Column>
                <Column>
                  <Form.Input
                    placeholder="Answer 4"
                    value={q.answ3}
                    onChange={(event) => (q.answ3 = event.currentTarget.value)}
                  ></Form.Input>
                </Column>
                <Column>{/*<Button.Danger>X</Button.Danger>*/}</Column>
              </Row>
              <Row>
                <Column>
                  <Button.Success
                    onClick={() => {
                      console.log('funker ikke bro');
                    }}
                  >
                    Legg til et svaralternativ?? nei!
                  </Button.Success>
                </Column>
                <Column>
                  <Button.Danger onClick={this.delQuestion}>Delete question</Button.Danger>
                </Column>
              </Row>
            </Card>
          ))}
        </>

        <Card>
          <Row>
            <Button.Success id="newquest" disabled={false} onClick={this.add}>
              New question
            </Button.Success>
          </Row>
          <Row>
            <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
            <Column>
              <Button.Success onClick={this.createQuiz}>Save</Button.Success>
            </Column>
          </Row>
        </Card>
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

export class NewQuizQuestion extends Component {
  title: string = '';
  questionText: string = '';
  correct: string[] = [];
  incorrect: string[] = [];
  numCorrect: number = 0;
  answers: AnswerType[] = [];

  mounted() {
    this.title = this.props.title;

    for (let i = 0; i < 4; i++) {
      this.answers.push({
        answerText: '',
        correct: false,
      });
    }

    console.log(`answers: ${this.answers}`);
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
        <Card title={this.title}>
          <Row>
            <Column width={2}>Correct: {}</Column>
            <Column>
              <Form.Input
                placeholder="Question"
                value={this.questionText}
                onChange={(event) => {
                  this.questionText = event.currentTarget.value;
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
export class NewQuizInfoCard extends Component {
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
