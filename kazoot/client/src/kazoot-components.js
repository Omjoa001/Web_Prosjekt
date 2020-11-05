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

export class Home extends Component {
  Question: QuizType[] = [];
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
          &nbsp;&nbsp;&nbsp; 
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

  // This could handle the state of the questions array based on
  // what the component returns
  renderQuestions() {
    let jsx: [] = [];
    jsx.push(<NewQuizQuestion title="Question component thingy"></NewQuizQuestion>);
    return jsx;
  }

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

          {this.renderQuestions()}

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
            <Button.Success onClick={() => history.push('/editQuiz')}>Edit</Button.Success>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }

  mounted() {}
}

export class playQuiz extends Component {
  id: number = 0;
  quizzes: QuizType = [];
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  quiz: QuizType = {};

  render() {
    return (
      <>
        <Card title="Play Quiz">{this.id}</Card>
        <Card title={this.quiz.title}>
          Description: {this.quiz.description}
          {<br></br>}
          Category: {this.quiz.categoryId}
        </Card>
        
        <Card title="Questions">
          {this.questions.map((a) => (
            <Card key={a.id} title={a.question}>
              <Column>
                <Row>Question Id: {a.id}</Row>
                <Row>quizId: {a.quizId}</Row>
                <Row>
                  {' '}
                  <br></br>
                </Row>
                <ul>
                  <li>{a.answ0}</li>
                  <li>{a.answ1}</li>
                  <li>{a.answ2}</li>
                  <li>{a.answ3}</li>
                </ul>
              </Column>
            </Card>
          ))}
        </Card>

    
      </>
    );
  }
  mounted() {
    this.id = this.props.match.params.id;
    //quizService.getNextId().then((next) => (this.nextId = next.AUTO_INCREMENT));
    quizService.getQuiz(this.id).then((q) => (this.quiz = q));
    questionService.getQuestion(this.id).then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
    console.log(this.questions)
  }
}

export class EditQuiz extends Component <{ match: { params: { id: number } } }> {

  id: number = 0;
  questions: QuestionType[] = [];
  categories: CategoryType[] = [];
  quiz: QuizType = {};
 
  nextId: number = 0;

 
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

  questions: QuestionType[] = []



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
                  type="text"
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
              <Column>Quiz-Id:</Column>
              <Column>
                <Form.Input value={this.quiz.id} disabled></Form.Input>
              </Column>
            </Row>
            <Row>
              <Column width={3}>Quiz-description:</Column>
              <Column>
                <Form.Textarea
                  placeholder="Quiz description"
                  type="text"
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
                    onChange={(event) => (q.answ1 = event.currentTarget.value)}
                    value={q.answ1}
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
              <Button.Success id="newquest" disabled={false} onClick={this.add}>
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
    questionService.getQuestion(this.id).then((p) => (this.questions = p));

    }

  saveQuiz(){

  }

  delQuestion(){
    this.questions.splice(this.index, 1)
  }

  add() {
    

    this.questions.id = (this.questions.id + 1);
    this.questions.push({
      question: '',
      quizId: this.quiz.id,
      answ0: '',
      answ1: '',
      answ2: '',
      answ3: '',
    });
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
    //quizService.getQuiz(1).then((q) => (this.quiz = q));
    questionService.getAllQuestions().then((p) => (this.questions = p));
    categoryService.getAllCategories().then((c) => (this.categories = c));
  }
}
