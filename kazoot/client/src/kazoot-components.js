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
          <Button.Success onClick={() => history.push('/editQuiz')}>Endre hallaaaaa quiz</Button.Success>
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

export class BrowseQuizzes extends Component {
  categories: number[] = [];

  render() {
    return (
      <>
        <Card title="Categories">{this.categories}</Card>
        <Card title="Search"></Card>
        <Card title="Quizzes">
          <QuizTileGrid></QuizTileGrid>
          {/* {this.quizzes.map((quiz) => ( */}
          {/*   <Row key={quiz.id}> */}
          {/*     <Column> */}
          {/*       <Quiz id={quiz.id} title={quiz.title}></Quiz> */}
          {/*       {/\* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> *\/} */}
          {/*     </Column> */}
          {/*   </Row> */}
          {/* ))} */}
          <Button.Light onClick={() => history.push('/')}>Back</Button.Light>
        </Card>
      </>
    );
  }

  mounted() {
    categoryService.getAll().then((categories) => (this.categories = categories));
  }
}

/**
 * Renders the quiz tile cards in a grid based on how many quizzes there are.
 *
 * TODO: Find a way to dynamically change the number of quizzes in the array.
 *  Ex: Using the categories and search tools should remove the quizzes that don't match
 *  the category and search conditions.
 *  Maybe the quizzes array could be passed from the BrowseQuizzes component.
 */
export class QuizTileGrid extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quizzes: [
  //       {
  //         title: 'quiz 1',
  //         id: 1,
  //         category: 1,
  //       },
  //       {
  //         title: 'quiz 2',
  //         id: 2,
  //         category: 2,
  //       },
  //       {
  //         title: 'quiz 3',
  //         id: 3,
  //         category: 3,
  //       },
  //     ],
  //   };
  // }

  render() {
    const elements: [] = this.quizzesToJSX();
    console.log(`render elements: ${elements}`);
    console.log(`render elements[0].title: ${elements.title}`);

    return <>{elements}</>;
  }

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

    console.log(`getQuizzes: ${quizzes}`);

    return quizzes;
  }

  quizzesToJSX() {
    let elements: [] = [];
    let quizzes = this.getQuizzes();

    console.log(`q2JSX test getQuizzes: ${quizzes}`);

    const width = 4;
    let i = 1;
    let k = 0;
    for (; i < quizzes.length + 1; ++i) {
      console.log(`i: ${i}`);
      if (i % width == 0) {
        const currentRow = quizzes.slice(k, i);
        // const currentRow = quizzes;
        console.log(`q2JSX test i: ${i}`);
        console.log(`q2JSX test k: ${k}`);
        console.log(`q2JSX test currentRow: ${currentRow}`);
        const element = this.rowContents(currentRow);
        elements.push(<Row>{element}</Row>);
        k = i;
      }
    }
    const remainingRow = quizzes.slice(k, i);
    const element = this.rowContents(remainingRow);
    elements.push(<Row>{element}</Row>);

    return elements;
  }

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

  mounted() {
    // console.log('QuizTileGrid:');
    // this.quizzes.map((quiz) => console.log(s
  }
}

/**
 * Quiz component.
 * This component should always have its ID passed to it.
 * TODO: Make this accept quiz objects instead.
 */
export class Quiz extends Component {
  title: string = 'hei';
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
