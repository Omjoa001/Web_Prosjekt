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
            Browse Quizzes{' '}
          </Button.Success>
          <Button.Success
            onClick={() => {
              history.push('/newQuiz');
            }}
          >
            Ny quiz
          </Button.Success>
          <Button.Success onClick={() => history.push('/quiz/edit')}>Endre quiz</Button.Success>
          <Button.Success onClick={() => history.push('/quiz/new')}>New Quiz</Button.Success>
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
  title: string = '';
  description: string = '';
  categoryId: number = 0;
  nextId: number = 0;

  newquestion: Array<{
    id: number,
    question: string,
    answ0: string,
    answ1: string,
    answ2: string,
    answ3: string,
  }> = [
    {
      id: 0,
      question: '',
      answ0: '',
      answ1: '',
      answ2: '',
      answ3: '',
    },
  ];

  render() {
    return (
      <>
        <Card title="New Quiz!">
          <Card>
            <Row>
              <Column width={3}>Quiz-title:</Column>
              <Column>
                <Form.Input
                  placeholder="Quiz title"
                  type="text"
                  value={this.title}
                  onChange={(event) => (this.title = event.currentTarget.value)}
                ></Form.Input>
              </Column>
            </Row>
            <Row>
              <Column width={3}>Quiz-Category:</Column>
              <Column>
                <select
                  name="Category"
                  value={this.categoryId}
                  onChange={(event) => (this.categoryId = event.currentTarget.value)}
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
                <Form.Input value={this.nextId} disabled></Form.Input>
              </Column>
            </Row>
            <Row>
              <Column width={3}>Quiz-description:</Column>
              <Column>
                <Form.Textarea
                  placeholder="Quiz description"
                  type="text"
                  value={this.description}
                  onChange={(event) => (this.description = event.currentTarget.value)}
                  row={10}
                ></Form.Textarea>
              </Column>
            </Row>
          </Card>

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
              <Column>
                {/*<Button.Danger onClick={() => {}}>X</Button.Danger>*/}
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox disabled></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  placeholder='Answer 1'
                  value={q.answ0}
                  onChange={(event) => (q.answ0 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
               {/*<Button.Danger>X</Button.Danger>*/}
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox disabled></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                    placeholder='Answer 2'
                    onChange={(event) => (q.answ1 = event.currentTarget.value)}
                    value={q.answ1}
                ></Form.Input>
              </Column>
              <Column>
               {/*<Button.Danger>X</Button.Danger>*/}
               </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox disabled></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                    placeholder='Answer 3'
                    value={q.answ2}
                    onChange={(event) => (q.answ2 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
               {/*<Button.Danger>X</Button.Danger>*/}
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Checkbox disabled></Form.Checkbox>
              </Column>
              <Column>
                <Form.Input
                  placeholder='Answer 4'
                  value={q.answ3}
                  onChange={(event) => (q.answ3 = event.currentTarget.value)}
                ></Form.Input>
              </Column>
              <Column>
                {/*<Button.Danger>X</Button.Danger>*/}
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
        .createQuestion(this.nextId, this.newquestion[i].question, this.newquestion[i].answ0, this.newquestion[i].answ1, this.newquestion[i].answ2, this.newquestion[i].answ3)
        .catch((error: Error) => Alert.danger('Error creating Question: ' + error.message)); 
      }
  }

  delQuestion(){
      this.newquestion.splice(this.index, 1)
  }

}

export class Questionside extends Component {
  render() {
    return (
      <>
        <Row>
          <Column>Spørsmål: 1</Column>
          <Column>
            <Form.Input placeholder="spørsmål"></Form.Input>
          </Column>
          <Column>
            <Button.Danger>Slett Spørsmål</Button.Danger>
          </Column>
        </Row>
        <Row>
          <Column>Riktig:</Column>
          <Column>Svar:</Column>
          <Column></Column>
        </Row>
        <Row>
          <Column>
            <Answerside />
          </Column>
        </Row>
        <Row>
          <Column>
            <Answerside />
          </Column>
        </Row>
        <Row>
          <Column>
            <Answerside />
          </Column>
        </Row>
        <Row>
          <Column>
            <Answerside />
          </Column>
        </Row>
        <Row>
          <Button.Success onClick={this.click}>Legg til svaralternativ</Button.Success>
        </Row>
      </>
    );
  }

  click() {
    console.log('kjørr');
  }
}

export class Answerside extends Component {
  answ0: string = '';

  render() {
    return (
      <>
        <Row>
          <Column>
            <Form.Checkbox></Form.Checkbox>
          </Column>
          <Column>
            <Form.Input
              placeholder="svar"
              type="text"
              value={this.answ0}
              onChange={(event) => (this.answ0 = event.currentTarget.value)}
            ></Form.Input>
          </Column>
          <Column>
            <Button.Danger onClick={this.DelAnswer()}>⚽️</Button.Danger>
          </Column>
        </Row>
      </>
    );
  }

  DelAnswer() {
    //kommando som sletter dette svaralternativet
  }
}

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
  id: number = this.props.quiz.id
  description: string = this.props.quiz.description

  playButton() {
    console.log(`Playing quiz ${this.id}`);
    //TODO: Link to quiz play site.
    history.push('/playQuiz/' + this.id);
  }

  editButton() {
    history.push('/editQuiz');
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
              <Button.Primary onClick={this.editButton}>Edit</Button.Primary>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }

  mounted() {
  }
}

export class playQuiz extends Component {
  render() {
    return (
      <>
        <Card title="Play Quiz"></Card>
      </>
    );
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
              <select name="Category" id="Category">
                <option value="Matte">Matte</option>
                <option value="Fysikk">Fysikk</option>
                <option value="Geografi">Geografi</option>
                <option value="It">It</option>
              </select>
            </Column>
            <Column></Column>
          </Row>
          <Card>
            <Row>
              <Column width={2}>Riktig:</Column>
              <Column>
                <Form.Input></Form.Input>
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

  mounted() {
    questionService
      .get()
  }

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
  nextId: number = 0;

  render() {
    return (
      <>
        <Card title="Max id in Quizzes table">
          <Card>
            <Row>{this.nextId}</Row>
          </Card>
        </Card>
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
                <Row>quizId: {question.quizId}</Row>
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
    quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
    quizService.getAllQuizzes().then((q) => (this.quizzes = q));
    questionService.getAllQuestions().then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
  }
}
