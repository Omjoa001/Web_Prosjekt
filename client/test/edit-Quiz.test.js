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
import { QuizEditor } from '../src/kazoot-components';
import { EditQuiz } from '../src/editquizzes-components';
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



describe('EditQuiz-Component tests', () => {
  test('Edit Quiz draws correctly', (done ) => {
    const wrapper = shallow(<EditQuiz match={{ params: { id: 2 } }} />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    })
  });
});
