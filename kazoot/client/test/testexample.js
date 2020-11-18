// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { type quizService, questionService, categoryService } from '../src/kazoot-service';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from '../src/widgets';
import { NavLink } from 'react-router-dom';

jest.mock('../src/kazoot-service', () => {
  class QuestionService {
    getAllQuestions() {
      return Promise.resolve([
        { id: 1, title: 'Les leksjon', done: false },
        { id: 2, title: 'Møt opp på forelesning', done: false },
        { id: 3, title: 'Gjør øving', done: false },
      ]);
    }

    create(title: string) {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }
  }
  return new QuestionService();
});

describe('Quiz component tests', () => {
  test('Quiz draws correctly', (done) => {
    const wrapper = shallow(<Home />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow();

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });
});
