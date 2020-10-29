// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import { type QuizType, type CategoryType, type QuestionType } from './kazoot-service';

const history = createHashHistory();

export class Home extends Component {
  Question: QuizType[] = [];
  question: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="spørsmål">
          {this.Question.map((spr) => (
            <Row key={spr.id}>
              <Column>{spr.title}</Column>
            </Row>
          ))}
        </Card>
        <Card title="Route test">
          <Button.Success onClick={() => history.push('/BrowseQuizzes')}>
            Browse Quizzes </Button.Success>
          <Button.Success onClick={() => { history.push('/newQuiz');}}>
            Ny quiz
          </Button.Success>
        </Card>
      </>
    );
  }

  mounted() {
    questionService.getAllQuestions().then((c) => (this.Question = c));
  }
}

/**
 * Component which renders the New Quiz page.
 */
export class NewQuiz extends Component {
  quiz = '';
  hei = '';
  render() {
    return (
      <>
        <Card title="New Quiz!">
          <Row>
            <Column width={3}>Quiz-title:</Column>
            <Column>
              <Form.Input
                type="text"
                onChange={(event) => (this.hei = event.currentTarget.value)}
                value={this.hei}
              ></Form.Input>
            </Column>
            <Column></Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-description:</Column>
            <Column>
              <Form.Input
                type="text"
                onChange={(event) => (this.hei = event.currentTarget.value)}
                value={this.hei}
              ></Form.Input>
            </Column>
            <Column></Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-Category:</Column>
            <Column>
              <Form.Input
                type="text"
                onChange={(event) => (this.quiz = event.currentTarget.value)}
                value={this.quiz}
              ></Form.Input>
            </Column>
            <Column></Column>
          </Row>
          <Card>
            <Row>
              <Column width={2}>Riktig:</Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="spørsmål"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar1"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar2"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar3"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar4"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column>
                <Button.Success onClick={() => {}}>+</Button.Success>
              </Column>
            </Row>
          </Card>
          <Row>
            <Button.Success>Nytt spørsmål</Button.Success>
          </Row>
          <Row>
            <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
            <Column>
              <Button.Success onClick={() => {}}>Save</Button.Success>
            </Column>
          </Row>
        </Card>
      </>
    );
  }
}

/**
 * Component which renders the Browse Quizzes page.
 */
export class BrowseQuizzes extends Component {
  quizzes: Array<{ id: number, title: string, description: string }> = [
    {
      id: 1,
      title: 'quiz 1',
      description: 'woowowowoowow',
      category: 1,
    },
    {
      id: 2,
      title: 'quiz 2',
      description: 'wewewewewe',
      category: 1,
    },
    {
      id: 3,
      title: 'quiz 3',
      description: 'wuwuwuwuwu',
      category: 1,
    },
    {
      id: 4,
      title: 'quiz 4',
      description: 'wewewowow',
      category: 1,
    },
    {
      id: 5,
      title: 'quiz 5',
      description:
        'long ass description. This description is multiple lines long. It is huge. Waow',
      category: 1,
    },
    {
      id: 6,
      title: 'quiz 6',
      description: 'kjdskad',
      category: 1,
    },
    {
      id: 7,
      title: 'quiz 7',
      description: 'hdsoafiosaj',
      category: 1,
    },
    {
      id: 8,
      title: 'quiz 8',
      description: 'jfkdlsajflkdsafø',
      category: 1,
    },
    {
      id: 9,
      title: 'quiz 9',
      description: 'jsidjaidsaj',
      category: 1,
    },
    {
      id: 10,
      title: 'quiz 10',
      description: 'sljdskal',
      category: 1,
    },
    {
      id: 11,
      title: 'quiz 11',
      description: 'jdksaljdskaljds',
      category: 1,
    },
    {
      id: 12,
      title: 'quiz 12',
      description: 'jdjskaldjskal',
      category: 1,
    },
  ];

  // Quiz array after it's been filtered by the search function
  filtered: Quiz[] = [];
  searchterm: string = '';
  categories = new Map([
    [1, 'Sport'],
    [2, 'Math'],
    [3, 'Geography'],
    [4, 'History'],
    [5, 'Yo mama'],
  ]);

  categorySelection() {
    jsx: [] = [];
    for (const category of this.categories.values()) {
      jsx.push(<div>{category}</div>);
    }
    return jsx;
  }

  search() {
    return this.quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(this.searchterm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(this.searchterm.toLowerCase())
    );
  }

  editSearchTerm(event) {
    this.searchterm = event.currentTarget.value;
  }

  render() {
    return (
      <>
        <Card title="Categories">
          <Row>{this.categorySelection.forEach(cat => {})}</Row>
        </Card>

        <Card title="Search">
          <Row>
            <div style={{ width: '50%' }}>
              {'  '}
              <Form.Input
                type="text"
                placeholder="🔎 Search for the title or description of a quiz"
                value={this.searchterm}
                onChange={this.editSearchTerm}
              ></Form.Input>
            </div>
          <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
          </Row>
        </Card>

        <Card title="Quizzes">
          <QuizTileGrid quizarr={this.quizzes} />
        </Card>
      </>
    );
  }
}

/**
 * Renders the quiz tile cards in a grid.
 * Used in BrowseQuizzes.
 *
 * TODO: Find a way to dynamically change the number of quizzes in the array.
 *  Ex: Using the categories and search tools should remove the quizzes that don't match
 *  the category and search conditions.
 *  Maybe the quizzes array could be passed from the BrowseQuizzes component.
 */
export class QuizTileGrid extends Component {
  quizzarr: Array<any> = []; //Needs fix

  render() {
    const grid: [] = this.quizzesToJSX();
    return <>{grid}</>;
  }

  /**
   * Generates the grid of quizzes and pushes it to an array of JSX elements.
   */
  quizzesToJSX() {
    // Array of rows of quizzes in columns
    let grid: [] = [];

    // TODO: Replace with database call sometime?
    let quizzes = this.props.quizarr;
    console.log(`quizzes length: ${quizzes.length}`);
    console.log(`q2j: quizzes: ${quizzes}`);
    if (quizzes.length == 0) {
      grid.push(<div>No quizzes matched the combination of categories and search 😢</div>);
    } else {
      let elements = [];
      quizzes.forEach((quiz) => {
        if (quiz != undefined) {
          elements.push(
            <Column>
              <Quiz title={quiz.title} id={quiz.id} description={quiz.description}></Quiz>
            </Column>
          );
        }
      });
      grid.push(<Row>{elements}</Row>);
    }
    return grid;
  }

  /**
   * Surrounds each quiz in a row with a Column tag and pushes it to an array of
   * JSX elements.
   */
  rowContents(row) {
    let elements: [] = [];
    for (const quiz of row) {
      elements.push(
        <Column>
          <Quiz id={quiz.id} title={quiz.title} description={quiz.description}></Quiz>
        </Column>
      );
    }
    return elements;
  }
}

/**
 * Quiz component used in BrowseQuizzes
 * This component should always have its ID passed to it.
 * TODO: Make this accept quiz objects instead.
 */
export class Quiz extends Component {
  title: string = '';
  id: number = 0;
  description: string = '';

  playButton() {
    console.log(`Playing ${this.props.title}`);
    //TODO: Link to quiz play site.
  }

  editButton() {
    history.push('/editQuiz');
  }

  render() {
    return (
      <>
        <TileCard title={this.props.title}>
          {this.props.description}
          <hr />
          <Row>
            <Column left>
              <Button.Success onClick={this.playButton}>Play</Button.Success>
            </Column>
            <Column right>
              <Button.Primary onClick={this.editButton}>Edit</Button.Primary>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }

  mounted() {
    // quizService.getQuizInfo(this.props.id).then((quiz) => (this.props.title = quiz.title));
    this.description = 'test';
  }
}

export class EditQuiz extends Component {
  quiz = '';
  hei = '';

  render() {
    return (
      <>
        <Card title="Edit Quiz">
          <Row>
            <Column width={3}>Quiz-title:</Column>
            <Column>
              <Form.Input
                type="text"
                onChange={(event) => (this.quiz = event.currentTarget.value)}
                value={this.quiz}
              ></Form.Input>
            </Column>
            <Column>
              <Button.Danger onClick={this.button()}>SLETT QUIZ</Button.Danger>
            </Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-description:</Column>
            <Column>
              <Form.Input
                type="text"
                onChange={(event) => (this.quiz = event.currentTarget.value)}
                value={this.quiz}
              ></Form.Input>
            </Column>
            <Column></Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-Category:</Column>
            <Column>
              <Form.Input
                type="text"
                onChange={(event) => (this.quiz = event.currentTarget.value)}
                value={this.quiz}
              ></Form.Input>
            </Column>
            <Column></Column>
          </Row>
          <Card>
            <Row>
              <Column width={2}>Riktig:</Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="spørsmål"
                  onChange={(event) => (this.hei = event.currentTarget.value)}
                  value={this.hei}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar1"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar2"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar3"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox checked={false} onChange={() => {}}></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  placeholder="Svar4"
                  onChange={(event) => (this.hei = event.currentTarget.value)}
                  value={this.hei}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger onClick={() => {}}>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column center>
                <Button.Success onClick={() => {}}>+</Button.Success>
              </Column>
            </Row>
          </Card>
          <Row>
            <Button.Success onClick={this.button}>Nytt spørsmål</Button.Success>
          </Row>
          <Row>
            <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
            <Column>
              <Button.Success onClick={() => {}}>Save</Button.Success>
            </Column>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {}

  button() {
    console.log('LOL');
  }
}

/*
 *
 */
export class ListQuizzes extends Component {
  quizzes: QuizType[] = [];
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];

  render() {
    return (
      <>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Card key={quiz.id} title={quiz.title}>
              <Column>
                <Row>Quiz Id: {quiz.id}</Row>
                <Row>Description: {quiz.description}</Row>
                <Row>Category: </Row>
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
              </Column>
            </Card>
          ))}
        </Card>
        <Card title="Questions">
          {this.questions.map((question) => (
            <Card key={question.id} title={question.question}>
              <Column>
                <Row>Question Id: {question.id}</Row>
                <Row>
                  {' '}
                  <br></br>
                </Row>
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
                <ul>
                  <li>{question.answ0}</li>
                  <li>{question.answ1}</li>
                  <li>{question.answ2}</li>
                  <li>{question.answ3}</li>
                </ul>
              </Column>
            </Card>
          ))}
        </Card>
        <Card title="Categories">
          {this.categories.map((category) => (
            <Card key={category.id} title={category.category}>
              <Row>Category Id: {category.id}</Row>
            </Card>
          ))}
        </Card>
        <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
      </>
    );
  }
  mounted() {
    quizService.getAllQuizzes().then((q) => (this.quizzes = q));
    questionService.getAllQuestions().then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
  }
}
