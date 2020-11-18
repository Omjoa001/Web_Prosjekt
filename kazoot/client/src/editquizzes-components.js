// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { QuizEditor } from './newquiz-components';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
  type StateQuestionType,
} from './kazoot-service';

const history = createHashHistory();

export class EditQuiz extends Component<{ match: { params: { id: number } } }> {
  id: number = 0;
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  quiz: QuizType = {};

  mounted() {
    this.id = this.props.match.params.id;
    quizService.getQuiz(this.id).then((q) => {
      this.quiz = q;
      console.log(`editquiz mounted quiz: ${JSON.stringify(this.quiz)}`);
    });
    questionService.getQuizQuestion(this.id).then((p) => (this.questions = p));
  }

  render() {
    return (
      <>
        <QuizEditor cardtitle="📣 Editing Quiz 📣" mode="edit" id={this.id} />
      </>
    );
  }
}

export class oldEditQuiz extends Component<{ match: { params: { id: number } } }> {
  render() {
    //if (questions[0] = undefined) return <div>loading</div>
    return (
      <>
        <Card title={'Edit Quiz ' + this.quiz.id}>
          <Card>
            <Row>
              <Column width={3}>Quiz-title:</Column>
              <Column>
                <Form.Input
                  placeholder="Quiz title"
                  value={this.quiz.title || ''}
                  onChange={(event) => (this.quiz.title = event.currentTarget.value)}
                ></Form.Input>
              </Column>
            </Row>
            <br></br>
            <Row>
              <Column width={3}>Quiz-Category:</Column>
              <Column>
                <Form.Select
                  name="Category"
                  value={this.quiz.categoryId}
                  onChange={(event) => (this.quiz.categoryId = event.currentTarget.value)}
                >
                  <option value={0}>Velg en kategori</option>
                  {this.categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.category}</option>
                  ))}
                </Form.Select>
              </Column>
            </Row>
            <Row>
              <Column width={3}>Quiz-Id:</Column>
              <Column>
                <Form.Input value={this.quiz.id || ''} disabled></Form.Input>
              </Column>
            </Row>
            <br></br>
            <Row>
              <Column width={3}>Quiz-description:</Column>
              <Column>
                <Form.Textarea
                  placeholder="Quiz description"
                  value={this.quiz.description || ''}
                  onChange={(event) => (this.quiz.description = event.currentTarget.value)}
                  row={10}
                ></Form.Textarea>
              </Column>
            </Row>
          </Card>
         
          {this.questions.map((q, index) => (
            <Card key={index} title={'Spørsmål ' + (index + 1)}>
              <Row>
                <Column width={2}>Question: </Column>
                <Column>
                  <Form.Input
                    placeholder="Question"
                    value={q.question}
                    onChange={(event) => (q.question = event.currentTarget.value)}
                  ></Form.Input>
                  <br></br>
                </Column>
                <Column></Column>
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
                  <br></br>
                </Column>
                <Column></Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Checkbox></Form.Checkbox>
                </Column>
                <Column>
                  <Form.Input
                    placeholder="Answer 2"
                    value={q.answ1}
                    onChange={(event) => (q.answ1 = event.currentTarget.value)}
                  ></Form.Input>
                  <br></br>
                </Column>
                <Column></Column>
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
                  <br></br>
                </Column>
                <Column></Column>
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
                  <br></br>
                </Column>
                <Column></Column>
              </Row>
              <Row>
                <Column>
                  <br></br>
                  <Button.Success
                    onClick={() => {
                      console.log('funker ikke bro');
                    }}
                  >
                    Legg til et svaralternativ
                  </Button.Success>
                </Column>
                <Column>
                  <br></br>
                  <Button.Danger onClick={this.delQuestion(index)}>Delete question</Button.Danger>
                </Column>
              </Row>
            </Card>
          ))}


          <Card>
            <Row>
              <Button.Success onClick={this.add}>New question</Button.Success>
            </Row>
            <br></br>
            <Row>
              <Column left>
                <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
              </Column>
              <Column>
                <Button.Success onClick={this.saveQuiz}>Save Quiz changes</Button.Success>
              </Column>
              <Column righet>
                <Button.Danger onClick={this.deleteQuiz}>Delete Quiz</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Button.Success onClick={this.logg}>console.log question array</Button.Success>
            </Row>
          </Card>
        </Card>
      </>
    );
  }

  logg() {
    console.log(this.questions);
    console.log(this.quiz.categoryId);
  }

  saveQuiz() {
    // sletter alle questions
    questionService.deleteQuestions(this.quiz.id);

    // legger til spøsmål
    for (let i = 0; i < this.questions.length; i++) {
      questionService.createQuestion(
        this.quiz.id,
        this.questions[i].question,
        this.questions[i].answ0,
        this.questions[i].answ1,
        this.questions[i].answ2,
        this.questions[i].answ3
      );
    }
    // endrer quiz
    quizService
      .updateQuiz(this.quiz.id, this.quiz.title, this.quiz.description, this.quiz.categoryId)
      .then((id) => history.push('/listQuizzes'))
      .catch((error: Error) => Alert.danger('Error Editing Quiz: ' + error.message));
  }

  // funker som fle
  deleteQuiz() {
    questionService
      .deleteQuestions(this.quiz.id)
      .catch((error: Error) => Alert.danger('Error deleting Questions: ' + error.message));

    quizService
      .deleteQuiz(this.quiz.id)
      .then((id) => history.push('/BrowseQuizzes'))
      .catch((error: Error) => Alert.danger('Error deleting Quiz: ' + error.message));
  }

  // funkersom som fle
  delQuestion(x: number) {
    this.questions.splice(x, 1);
  }
  // funker
  add() {
    this.newQuestion = {
      quizId: this.quiz.id,
      question: '',
      answ0: '',
      answ1: '',
      answ2: '',
      answ3: '',
    };
    this.questions.push(this.newQuestion);
  }
}
