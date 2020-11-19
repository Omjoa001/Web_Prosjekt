// @flow

import * as React from 'react';
import ReactDom from 'react-dom';
import {
  Alert,
  Column,
  Button,
  Form,
  Card,
  CenterCard,
  AnswerCard,
  LayoutCenter,
  TileCard,
  QuestionCard,
  Row,
  NavBar,
} from '../src/widgets.js';
import { Component } from 'react-simplified';
import { BrowseQuizzes } from '../src/browsequizzes-components';
import { Home, Question, QuizEditor } from '../src/kazoot-components';
import { EditQuiz } from '../src/editquizzes-components';
import { NewQuiz } from '../src/newquiz-components';
import { PlayQuiz } from '../src/playquiz-components';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import { quizService, questionService, categoryService} from '../src/kazoot-service';
import { type QuizType, type QuestionType, type CategoryType} from  '../src/kazoot-service';

jest.mock('../src/kazoot-service', () => {
  class QuizService {
    getAllQuizzes(): Promise<QuizType[]> {
      return Promise.resolve([
        { id: 1, title: 'Quiz 1', description: 'Description 1', categoryId: 1 },
        { id: 2, title: 'Quiz 2', description: 'Description 2', categoryId: 2 },
      ]);
    }

    getQuiz(id: number): Promise<QuizType> {
      return Promise.resolve(
        { id: 2, title: 'Quiz 2', description: 'Description 2', categoryId: 2 }
      )
    }
  }

  class QuestionService {
    getAllQuestions(): Promise<QuestionType[]> {
      return Promise.resolve([
        {
          id: 1,
          quizId: 1,
          question: 'Question 1',
          answ0: 'answ0 Question 1',
          answ1: 'answ1 Question 1',
          answ2: 'anw2 Question 1',
          answ3: 'answ3 Question 1',
          numCorrect: 2,
        },
        {
          id: 2,
          quizId: 2,
          question: 'Question 2',
          answ0: 'answ0 Question 2',
          answ1: 'answ1 Question 2',
          answ2: 'answ2 Question 2',
          answ3: 'answ3 Question 2',
          numCorrect: 1,
        },
      ]);
    }
  }


  class CategoryService {
    getAllCategories(): Promise<CategoryType[]> {
      return Promise.resolve([
        {id: 1, category: 'Matte'},
        {id: 2, category: 'Geografi'}
      ]);
    }
  }

  return (new QuizService(), new QuestionService(), new CategoryService())
});


/**
 *
 *
 *
 * QUIZ COMPONENTS
 *
 *
 */

describe('Home tests', () => {
  test('Home buttons draws correctly', (done) => {
    const wrapper = shallow(<Home />);

    expect(
      wrapper.containsMatchingElement(
        <div
          style={{
            width: '100vh',
            marginLeft: '25%',
            marginRight: '25%',
            flex: '1',
            flexDirection: 'column',
          }}
        >
          <button
            type="button"
            class="btn btn-success btn-lg btn-block"
            onClick={() => history.push('/BrowseQuizzes')}
          >
            Browse Quizzes{' '}
          </button>
        </div>
      )
    );

    expect(
      wrapper.containsMatchingElement(
        <div
          style={{
            width: '100vh',
            marginLeft: '25%',
            marginRight: '25%',
            flex: '1',
            flexDirection: 'column',
          }}
        >
          <button
            type="button"
            class="btn btn-success btn-lg btn-block"
            onClick={() => {
              history.push('/quiz/new');
            }}
          >
            New Quiz
          </button>
        </div>
      )
    );

    done();
  });

  test('Home button 1 work', (done) => {
    const wrapper = shallow(<Home />);

    wrapper.find(Button.Start).at(0).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/BrowseQuizzes');
      done();
    });
  });

  test('Home button 2 work', (done) => {
    const wrapper = shallow(<Home />);

    wrapper.find(Button.Start).at(1).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/quiz/new');
      done();
    });
  });
});

describe('QuizEditor tests', () => {
  test('QuizEditor draws correctly', (done) => {
    const wrapper = shallow(<QuizEditor />);

    console.log(wrapper.debug());
    expect(wrapper.containsMatchingElement(<Card></Card>));
  });
});

describe('Browsequizzes-Component tests', () => {
  test('BrowseQuiz-Component draws correctly', () => {
    const wrapper = shallow(<BrowseQuizzes />);

    console.log(wrapper.debug());

    setTimeout(() => {
      expect(
        wrapper.containsMatchingElement(
          <>
            <CardSmaller title="Browse Quiz 🧐">S</CardSmaller>

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
        )
      );
    });
  });
});

describe('NewQuiz-Component tests', () => {
  test('New quiz draws correctly', (done) => {
    const wrapper = shallow(<NewQuiz />);

    expect(
      wrapper.containsMatchingElement(
        <QuizEditor cardtitle="📣 Creating a new quiz! 📣" mode="new" />
      )
    );
    done();
  });
});

describe('EditQuiz-Component tests', () => {
  test('Edit Quiz draws correctly', (done ) => {
    const wrapper = shallow(<EditQuiz match={{ params: { id: 2 } }} />);

    console.log(wrapper.debug())
    setTimeout(() => {
      console.log(wrapper.debug())
      expect(
        wrapper.containsMatchingElement(
          <QuizEditor cardtitle="📣 Editing Quiz 📣" mode="edit" id={2} />
        )
      );
      done();
    })
  });
});

describe('PlayQuiz-Component tests', () => {
  test('PlayQuiz-Component draws correctly', (done) => {
    const wrapper = shallow(<PlayQuiz match={{ params: { id: 2 } }} />);

    console.log(wrapper.debug())
    setTimeout(() => {
      console.log(wrapper.debug());
      expect(wrapper.containsMatchingElement([]));
    });
    done();
  });
});
