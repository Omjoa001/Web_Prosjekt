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

export class EditQuiz extends Component <{ match: { params: { id: number } } }> {

  //nextId: number = 0;
  id: number = 0;
  questions: QuestionType[] = []
  categories: CategoryType[] = [];
  quiz: QuizType = {};


  newquestion: Array<{
    id: 0,
    question: '',
    answ0: {
      id: 0,
      ans: '',
      bool: false
    },
    answ1: {
      id: 0,
      ans: '',
      bool: false
    },
    answ2: {
      id: 0,
      ans: '',
      bool: false
    },
    answ3: {
      id: 0,
      ans: '',
      bool: false
    },
  }> = [
    {
    },
  ];




  render() {
     //if (questions[0] = undefined) return <div>loading</div>
    return (
      <>
        <Card title={"Edit Quiz " + this.quiz.id + "!!!" }>
          <Card>
            <Column>
              <Row>
                {this.quiz.id}
              </Row>
            </Column>
            <Row>
              <Column width={3}>Quiz-title:</Column>
              <Column>
                <Form.Input
                  placeholder="Quiz title"
                  value={this.quiz.title}
                  onChange={(event) => (this.quiz.title = event.currentTarget.value)}
                ></Form.Input>
              </Column>
            </Row>
            <Row>
              <Column width={3}>Quiz-Category:</Column>
              <Column>
                <select
                  name="Category"
                  value={this.quiz.categoryId}
                  onChange={(event) => (this.quiz.categoryId = event.currentTarget.value)}
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
              <Column width={3}>Quiz-Id:</Column>
              <Column>
                <Form.Input value={this.quiz.id} disabled></Form.Input>
              </Column>
            </Row>
            <Row>
              <Column width={3}>Quiz-description:</Column>
              <Column>
                <Form.Textarea
                  placeholder="Quiz description"
                  value={this.quiz.description}
                  onChange={(event) => (this.quiz.description = event.currentTarget.value)}
                  row={10}
                ></Form.Textarea>
              </Column>
            </Row>
          </Card>

          {this.questions.map((q, index) => (
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
              <Column>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox ></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  placeholder='Answer 1'
                  value={q.answ0}
                  onChange={(event) => (q.answ0 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox ></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                    placeholder='Answer 2'
                    value={q.answ1}
                    onChange={(event) => (q.answ1 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
               </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox ></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                    placeholder='Answer 3'
                    value={q.answ2}
                    onChange={(event) => (q.answ2 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox ></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  placeholder='Answer 4'
                  value={q.answ3}
                  onChange={(event) => (q.answ3 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
              </Column>
            </Row>
            <Row>
              <Column>
                <Button.Success onClick={() => {console.log("funker ikke bro")}}>Legg til et svaralternativ?? nei!</Button.Success>
              </Column>
              <Column>
                <Button.Danger onClick={this.delQuestion}>Delete question</Button.Danger>
              </Column>
            </Row>
          </Card>
          ))}

          <Card>
            <Row>
              <Button.Success onClick={this.add}>
                New question
              </Button.Success>
            </Row>
            <Row>
              <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
              <Column>
                <Button.Success onClick={this.saveQuiz}>Save Quiz changes</Button.Success>
              </Column>
            </Row>
          </Card>
        </Card>
      </>
    );
  }

  mounted() {

    this.id = this.props.match.params.id;
    quizService.getQuiz(this.id).then((q) => (this.quiz = q));
    questionService.getQuizQuestion(this.id).then((p) => (this.questions = p));

    }

  saveQuiz(){
    quizService
      .updateQuiz(this.title, this.description, this.categoryId)
      .then((id) => history.push('/tasks/' + id))
      

    for (let i = 0; i < this.questions.length; i++) {
      console.log(this.questions[i]);
      questionService
        .createQuestion(
          this.quiz.id,
          this.questions[i].question,
          this.questions[i].answ0,
          this.questions[i].answ1,
          this.questions[i].answ2,
          this.questions[i].answ3
        )
  delQuestion(){
    this.questions.splice(this.index, 1)
  }

  add() {
    this.id = 10
    this.questions.push({
      id: this.id,
      quizId: this.quiz.id,
      question: '',
      numCorrect: 0,
      answ0: '',
      answ1: '',
      answ2: '',
      answ3: '',
    });
    console.log(this.id)
    this.id = (this.id + 1)
  }


  button() {
  }
}
