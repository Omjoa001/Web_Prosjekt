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


/**
 * Component which renders the Browse Quizzes page.
 */
export class BrowseQuizzes extends Component {
  quizzes: Array<{ id: number, title: string, description: string }> = [
    {
      id: 1,
      title: 'Sportsquiz',
      description: 'woowowowoowow',
      category: 1,
    },
    {
      id: 2,
      title: 'Mattequiz',
      description: 'wewewewewe',
      category: 2,
    },
    {
      id: 3,
      title: 'Geografiquiz',
      description: 'wuwuwuwuwu',
      category: 3,
    },
    {
      id: 4,
      title: 'Historiequiz',
      description: 'wewewowow',
      category: 4,
    },
    {
      id: 5,
      title: 'Noe rart noe',
      description:
        'long ass description. This description is multiple lines long. It is huge. Waow',
      category: 5,
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

  // Dummy array of categories
  // TODO: Replace with database call
  categories: [] = [
    { id: 1, name: 'Sport', checked: false },
    { id: 2, name: 'Math', checked: false },
    { id: 3, name: 'Geography', checked: false },
    { id: 4, name: 'History', checked: false },
    { id: 5, name: 'Yo Mama', checked: false },
  ];

  /**
   * Renders category names with checkboxes.
   * Handles checkbox state.
   */
  renderCategories() {
    let jsx: [] = [];
    this.categories.forEach((category) => {
      jsx.push(
        <Column>
          <Form.Checkbox
            onChange={(event) => {
              category.checked = event.target.checked;
            }}
          />
          {category.name}
        </Column>
      );
    });
    {
      console.log(`rendercats: ${this.categories}`);
    }

    // jsx = (
    //   <div style={{ margin: '25px' }}>
    //     <Row>{jsx}</Row>
    //   </div>
    // );

    return jsx;
  }

  /**
   * Filters the quizzes array based on the selected categories.
   * If no categories are selected, all quizzes are shown.
   */
  categoryFilter() {
    let catFilter: [] = [];

    this.categories.forEach((category) => {
      if (category.checked) {
        this.quizzes.forEach((quiz) => {
          if (quiz.category == category.id) {
            catFilter.push(quiz);
          }
        });
      }
    });

    console.log(`catFilter: ${catFilter}`);

    if (catFilter.length == 0) {
      return this.quizzes;
    } else {
      return catFilter;
    }
  }

  // The query written in the search bar
  searchterm: string = '';

  /**
   * Searches for the title or description of quizzes in the selected categories
   */
  search() {
    const filteredQuizzes = this.categoryFilter();
    return filteredQuizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(this.searchterm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(this.searchterm.toLowerCase())
    );
  }

  /**
   * Used in the search box input to register the search term
   */
  editSearchTerm(event) {
    this.searchterm = event.currentTarget.value;
  }

  render() {
    return (
      <>
        <Card title="Categories">
          <div>{this.renderCategories()}</div>
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
          <QuizTileGrid quizarr={this.search()} />
        </Card>
      </>
    );
  }
}

/**
 * Renders the quiz tile cards in a grid.
 * Used in BrowseQuizzes.
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
              <Quiz quiz={quiz}></Quiz>
            </Column>
          );
        }
      });
      grid.push(<Row>{elements}</Row>);
    }
    return grid;
  }

  /**
   * Surrounds each quiz in a row with a Column tag and pushes it to an array of JSX elements.
   */
  rowContents(row) {
    let jsx: [] = [];
    for (const quiz of row) {
      jsx.push(
        <Column>
          <Quiz quiz={quiz}></Quiz>
        </Column>
      );
    }
    return jsx;
  }
}

/**
 * Quiz component used in BrowseQuizzes.
 * This component should always have its ID passed to it.
 * Uses a modified Card widget called TileCard.
 * TODO: Make this accept quiz objects instead.
 */
export class Quiz extends Component {
  title: string = this.props.quiz.title;
  id: number = this.props.quiz.id;
  description: string = this.props.quiz.description;

  playButton() {
    console.log(`Playing quiz ${this.id}`);
    //TODO: Link to quiz play site.
    history.push('/playQuiz/' + this.id);
  }

  editButton() {
    history.push('/editQuiz/' + this.props.id);
  }

  render() {
    return (
      <>
        <TileCard title={this.title}>
          {this.description}
          <hr />
          <Row>
            <Column left>
              <Button.Success onClick={this.playButton}>
                {/*<NavBar.Link to='/playQuiz'>Play</NavBar.Link>*/}
                Play
              </Button.Success>
            </Column>
            <Column right>
            <Button.Primary onClick={() => history.push('/editQuiz/'+this.props.id)}>Edit</Button.Primary>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }

  mounted() {}
}
