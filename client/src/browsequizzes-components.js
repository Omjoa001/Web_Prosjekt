// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar, CardSmaller } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';
import {
  type QuizType,
  type CategoryType,
  type QuestionType,
  type AnswerType,
  type CategoryFilterType,
} from './kazoot-service';

const history = createHashHistory();

/**
 * Component which renders the Browse Quizzes page.
 */
export class BrowseQuizzes extends Component<{}> {
  quizzes: QuizType[] = [];
  categories: CategoryFilterType[] = [
    { id: 1, category: 'Failed to get categories', checked: false },
  ];
  categoriesAreLoaded: boolean = false; // Program waits until true
  quizzesAreLoaded: boolean = false; // Program waits until true

  mounted() {
    categoryService.getAllCategories().then((c: CategoryType[]) => {
      this.categories = c;
      this.categoriesAreLoaded = true;
      this.categories.map((cat) => {
        cat.checked = false;
      });
    });

    quizService.getAllQuizzes().then((q) => {
      this.quizzes = q;
      this.quizzesAreLoaded = true;
    });
  }

  /**
   * Renders category names with checkboxes.
   * Handles checkbox state.
   */
  // renderCategories() {
  //   return this.categories.map<mixed>((category: CategoryFilterType) => {
  //     return (
  //       <>
  //         <Column>
  //           <Form.Checkbox
  //             onChange={(event: SyntheticEvent<HTMLInputElement>) => {
  //               category.checked = event.target.checked;
  //             }}
  //           />
  //           &nbsp;&nbsp;&nbsp;
  //           {category.category}
  //         </Column>
  //       </>
  //     );
  //   });
  // }

  renderCategories() {
    let ret: [] = [];

    this.categories.forEach((category) => {
      ret.push(
        <Column>
          <Form.Checkbox
            onChange={(event) => {
              category.checked = event.target.checked;
              this.forceUpdate();
            }}
          />
          &nbsp;&nbsp;&nbsp;
          {category.category}
        </Column>
      );
    });

    return ret;
  }

  /**
   * Filters the quizzes array based on the selected categories.
   * If no categories are selected, all quizzes are shown.
   * @return - quizzes whose category matches one of the selected categories
   */
  categoryFilter() {
    let filteredQuizzes: QuizType[] = [];

    console.log(`catfilt this.cats: ${JSON.stringify(this.categories)}`);

    this.categories.forEach((category) => {
      if (category.checked) {
        this.quizzes.forEach((quiz) => {
          if (quiz.categoryId == category.id) {
            filteredQuizzes.push(quiz);
          }
        });
      } else {
        console.log(`cat not checked: ${category.category} checked: ${category.checked}`);
      }
    });

    console.log(`catfilter filtq: ${filteredQuizzes.toString()}`);

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
    const filteredQuizzes: QuizType[] = this.categoryFilter();
    return filteredQuizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(this.searchterm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(this.searchterm.toLowerCase())
    );
  }

  /**
   * Used in the search box input to register the search term
   */
  editSearchTerm(event: SyntheticInputEvent<>) {
    this.searchterm = event.currentTarget.value;
  }

  /**
   * Generates the grid of quizzes
   */
  quizTileGrid() {
    let quizzes = this.search();

    console.log(this.search());
    console.log(`wack: ${JSON.stringify(quizzes)}`);

    if (quizzes.length == 0) {
      return <div>No quizzes matched the combination of categories and search 😢</div>;
    } else {
      let elements = [];
      quizzes.forEach((quiz) => {
        if (quiz) {
          elements.push(
            <Column>
              <Quiz quiz={quiz}></Quiz>
            </Column>
          );
        }
      });
      return <Row>{elements}</Row>;
    }
  }

  render() {
    if (this.quizzesAreLoaded && this.categoriesAreLoaded) {
      return (
        <>
          <CardSmaller title="Browse Quizzes 🧐">S</CardSmaller>

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

          <Card title="Quizzes">{this.quizTileGrid()}</Card>
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

/**
 * Quiz component used in BrowseQuizzes.
 * This component should always have its ID passed to it.
 * Uses a modified Card widget called TileCard.
 * TODO: Make this accept quiz objects instead.
 */
export class Quiz extends Component<{}> {
  render() {
    return (
      <>
        <TileCard title={this.props.quiz.title}>
          {this.props.quiz.description}
          <hr />
          <Row>
            <Column left>
              <Button.Success onClick={() => history.push('/playQuiz/' + this.props.quiz.id)}>
                Play
              </Button.Success>
            </Column>
            <Column right>
              <Button.Primary onClick={() => history.push('/editQuiz/' + this.props.quiz.id)}>
                Edit
              </Button.Primary>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }
}
