// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';

const history = createHashHistory();

export class Home extends Component {
  sprs: Kvisser[] = [];
  question: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="spørsmål">
          {this.sprs.map((spr) => (
            <Row key={spr.id}>
              <Column>{spr.question}</Column>
            </Row>
          ))}
        </Card>
        <Card title="Route test">
          <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
          <Button.Danger onClick={() => history.push('/Browse')}>Browse</Button.Danger>
          <Button.Light
            onClick={() => {
              history.push('/newQuiz');
            }}
          >
            Ny quiz
          </Button.Light>
          <Button.Success onClick={() => history.push('/editQuiz')}>Endre quiz</Button.Success>
        </Card>
      </>
    );
  }

  mounted() {
    questionService.getAll().then((sprs) => (this.sprs = sprs));
  }
}

export class NewQuiz extends Component {
  render() {
    return (
      <>
        <Card title="New Quiz!">
          <Row>
            <Column width={3}>Quiz-title:</Column>
            <Column>
              <Form.Input
                onChange={(event) => (this.quiz = event.currentTarget.value)}
                value={this.quiz}
              ></Form.Input>
            </Column>
            <Column></Column>
          </Row>
          <Row>
            <Column width={3}>Quiz-description:</Column>
            <Column>
              <Form.Input
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
                  placeholder="spørsmål"
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
                  placeholder="Svar2"
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
                  placeholder="Svar3"
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
                  placeholder="Svar4"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column>
                <Button.Success>+</Button.Success>
              </Column>
            </Row>
          </Card>
          <Row>
            <Button.Success onClick={this.button}>Nytt spørsmål</Button.Success>
          </Row>
          <Row>
            <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
            <Column>
              <Button.Success>Save</Button.Success>
            </Column>
          </Row>
        </Card>
      </>
    );
  }
}

/**
 * Dummy commit comment thingy
 *
 * Example of pull request
 */
export class BrowseQuizzes extends Component {
  render() {
    return (
      <>
        <Card title="Categories">{this.categories}</Card>
        <Card title="Search"></Card>
        <Card title="Quizzes">
          <QuizTileGrid></QuizTileGrid>
          <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
        </Card>
      </>
    );
  }
}

/**
 * Renders the quiz tile cards in a grid.
 *
 * TODO: Find a way to dynamically change the number of quizzes in the array.
 *  Ex: Using the categories and search tools should remove the quizzes that don't match
 *  the category and search conditions.
 *  Maybe the quizzes array could be passed from the BrowseQuizzes component.
 */
export class QuizTileGrid extends Component {
  render() {
    const grid: [] = this.quizzesToJSX();
    return <>{grid}</>;
  }

  /**
   * Returns an array of dummy quizzes.
   * TODO: This should be replaced with a database call sometime.
   */
  getQuizzes() {
    let quizzes: Quiz[] = [
      {
        id: 1,
        title: 'quiz 1',
      },
      {
        id: 2,
        title: 'quiz 2',
      },
      {
        id: 3,
        title: 'quiz 3',
      },
      {
        id: 4,
        title: 'quiz 4',
      },
      {
        id: 5,
        title: 'quiz 5',
      },
      {
        id: 6,
        title: 'quiz 6',
      },
      {
        id: 7,
        title: 'quiz 7',
      },
      {
        id: 8,
        title: 'quiz 8',
      },
      {
        id: 9,
        title: 'quiz 9',
      },
      {
        id: 10,
        title: 'quiz 10',
      },
      {
        id: 11,
        title: 'quiz 11',
      },
      {
        id: 12,
        title: 'quiz 12',
      },
    ];

    return quizzes;
  }

  /**
   * Generates the grid of quizzes and pushes it to an
   * array of JSX elements.
   */
  quizzesToJSX() {
    // Array of rows of quizzes in columns
    let grid: [] = [];

    // TODO: Replace with database call sometime?
    let quizzes = this.getQuizzes();

    // width = number of quizzes per row
    const width = 4;
    let i = 1;
    let k = 0;

    /* Slices the array every 'width' iteration of the loop.
     * Surround each quiz in a slice with Column (@see rowContents(row)),
     * then surrounds the entire slice with a Row tag.
     */
    for (; i < quizzes.length + 1; ++i) {
      if (i % width == 0) {
        const currentRow = quizzes.slice(k, i);
        const row = this.rowContents(currentRow);
        grid.push(<Row>{row}</Row>);
        k = i;
      }
    }

    // Add the remaining quizzes to the last row
    const remainingRow = quizzes.slice(k, i);
    const row = this.rowContents(remainingRow);
    grid.push(<Row>{row}</Row>);

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
          <Quiz id={quiz.id} title={quiz.title}></Quiz>
        </Column>
      );
    }
    return elements;
  }
}

/**
 * Quiz component.
 * This component should always have its ID passed to it.
 * TODO: Make this accept quiz objects instead.
 */
export class Quiz extends Component {
  title: string = '';
  id: number = 0;

  playButton() {
    console.log(`Playing ${this.props.title}`);
  }

  editButton() {
    console.log(`Editing ${this.props.title}`);
  }

  render() {
    return (
      <>
        <TileCard title={this.props.title}>
          <Row>
            <Column left>
              <Button.Success onClick={this.playButton}>Play</Button.Success>
            </Column>
            <Column right>
              <Button.Danger onClick={this.editButton}>Edit</Button.Danger>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }

  mounted() {
    // quizService.getQuizInfo(this.props.id).then((quiz) => (this.props.title = quiz.title));
  }
}

export class EditQuiz extends Component {
  render() {
    return (
      <>
        <Card title="Edit Quiz">
          <Row>
            <Column width={3}>Quiz-title:</Column>
            <Column>
              <Form.Input
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
                  placeholder="spørsmål"
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
                  placeholder="Svar2"
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
                  placeholder="Svar3"
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
                  placeholder="Svar4"
                  onChange={(event) => (this.quiz = event.currentTarget.value)}
                  value={this.quiz}
                ></Form.Input>
              </Column>
              <Column>
                <Button.Danger>X</Button.Danger>
              </Column>
            </Row>
            <Row>
              <Column center>
                <Button.Success>+</Button.Success>
              </Column>
            </Row>
          </Card>
          <Row>
            <Button.Success onClick={this.button}>Nytt spørsmål</Button.Success>
          </Row>
          <Row>
            <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
            <Column>
              <Button.Success>Save</Button.Success>
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
{this.tasks.map((task) => (
            <Row key={task.id}>
              <Column>
                <NavLink to={'/tasks/' + task.id}>{task.title}</NavLink>
              </Column>
            </Row>
          ))}
*/

export class ListQuizzes extends Component {
  quizzes: Kvisser[] = [];

  render() {
    return (
      <>
        <Card title="Categories">{this.categories}</Card>
        <Card title="Search"></Card>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Row key={quiz.id}>
              <Column>
                {quiz.title}
                {quiz.id}
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
              </Column>
            </Row>
          ))}
          <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
        </Card>
      </>
    );
  }
  mounted() {
    quizService.getAll().then((i) => (this.quizzes = i));
  }
}
