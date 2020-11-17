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
  quizzes: Array<{ id: number, title: string, description: string }> = [];
  categories: [] = [{ id: 1, name: 'Failed to get categories', checked: false }];

  mounted() {
    categoryService
      .getAllCategories()
      .then((c) => {
        this.categories = c;
        console.log(this.categories);
      })
      .then(() => {
        this.categories.map((cat) => {
          cat.checked = false;
        });
      });

    quizService.getAllQuizzes().then((q) => (this.quizzes = q));
  }

  /**
   * Renders category names with checkboxes.
   * Handles checkbox state.
   */
  renderCategories() {
    return this.categories.map((category) => {
      return (
        <>
          <Column>
            <Form.Checkbox
              onChange={(event) => {
                category.checked = event.target.checked;
              }}
            />
            &nbsp;&nbsp;&nbsp;
            {category.category}
          </Column>
        </>
      );
    });
  }

  /**
   * Filters the quizzes array based on the selected categories.
   * If no categories are selected, all quizzes are shown.
   * @return - quizzes with selected category
   */
  categoryFilter() {
    let filteredQuizzes: [] = [];

    this.categories.map((category) => {
      if (category.checked) {
        console.log(`catfiler: ${this.quizzes}`);
        this.quizzes.map((quiz) => {
          if (quiz.categoryId == category.id) {
            filteredQuizzes.push(quiz);
          }
        });
      }
    });

    console.log(`catfilter: ${JSON.stringify(filteredQuizzes)}`);

    if (filteredQuizzes.length == 0) {
      return this.quizzes;
    } else {
      return filteredQuizzes;
    }
  }

  // The query written in the search bar
  searchterm: string = '';

  /**
   * Searches for the title or description of quizzes in the selected categories
   */
  search() {
    const filteredQuizzes = this.categoryFilter();

    console.log(`search filteredquizzes: ${JSON.stringify(filteredQuizzes)}`);
    console.log(`search searchterm: ${this.searchterm}`);

    let hei = filteredQuizzes.filter((quiz) => {
      console.log(`fq quiz: ${JSON.stringify(quiz)}`);
      console.log(`fq quiz: ${quiz.title.toLowerCase().includes('torstein')}`);
      quiz.title.toLowerCase().includes(this.searchterm.toLowerCase()) //||
        // quiz.description.toLowerCase().includes(this.searchterm.toLowerCase());
    });

    console.log(`search searchterm: ${this.searchterm}`);
    console.log(`search hei: ${hei}`);

    return hei;
  }

  /**
   * Used in the search box input to register the search term
   */
  editSearchTerm(event) {
    this.searchterm = event.currentTarget.value;
    console.log(`editst: ${this.searchterm}`);
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
              <Form.Input
                type="text"
                placeholder="🔎 Search for the title or description of a quiz"
                value={this.searchterm}
                onChange={this.editSearchTerm}
              ></Form.Input>
            </div>
          </Row>
        </Card>

        <Card title="Quizzes">
          {console.log(`inside render: ${JSON.stringify(this.search())}`)}
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
  quizzes: Array<any> = []; //Needs fix

  render() {
    const grid: [] = this.quizzesToJSX();
    return <>{grid}</>;
  }

  /**
   * Generates the grid of quizzes
   */
  quizzesToJSX() {
    // Array of rows of quizzes in columns
    let grid: [] = [];

    // TODO: Replace with database call sometime?
    let quizzes = this.quizzes;
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
   * Surrounds each quiz in a row in column tags
   */
  rowContents(row) {
    for (const quiz of row) {
      return (
        <Column>
          <Quiz quiz={quiz}></Quiz>
        </Column>
      );
    }
  }

  mounted() {
    quizService.getAllQuizzes().then((q) => (this.quizzes = q));
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
              <Button.Success onClick={this.playButton}>Play</Button.Success>
            </Column>
            <Column right>
              <Button.Primary onClick={() => history.push('/editQuiz/' + this.id)}>
                Edit
              </Button.Primary>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }
}
