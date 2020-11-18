// @flow

import * as React from 'react';
import { Alert, Column, Button, Form } from '../src/widgets.js';
import { Component } from 'react-simplified';
import {BrowseQuizzes} from '../src/browsequizzes-components'
import { shallow } from 'enzyme';
import { quizService, questionService, categoryService } from '../src/kazoot-service';

describe('Alert tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<></>)).toEqual(true);
  });

  test('Show alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });

  test('Close alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').simulate('click');

      expect(wrapper.matchesElement(<></>)).toEqual(true);

      done();
    });
  });
});

describe('Column Widgets tests', () => {
  test('Column Widget draws correctly', () => {
    const wrapper = shallow(<Column>text</Column>);

    expect(wrapper.containsMatchingElement(<div className='col'>text</div>)).toEqual(true);
  });

  test('Column Widget draws correctly with width prperty set', () => {
    const wrapper = shallow(<Column width={3}>text</Column>);

    expect(wrapper.containsMatchingElement(<div className='col-3'>text</div>)).toEqual(true);
  });
  
  test('Column Widget draws correctly right', () => {
    const wrapper = shallow(<Column right>text</Column>);

    expect(wrapper.containsMatchingElement(<div className='col text-right'>text</div>)).toEqual(true);
  });

  test('Column Widget draws correctly left', () => {
    const wrapper = shallow(<Column left>text</Column>);

    expect(wrapper.containsMatchingElement(<div className='col text-left'>text</div>)).toEqual(true);
  });
});

describe('Button widget tests', () => {
  test('Button.Light widget draws correctly', () => {
    const wrapper = shallow(<Button.Light>text</Button.Light>)

    expect(wrapper.containsMatchingElement(<button className='btn btn-light'>text</button>))
  });

  test('Button.Light widget draws correctly with small property set', () => {
    const wrapper = shallow(<Button.Light small>text</Button.Light>)

    expect(wrapper.containsMatchingElement(<button className='btn btn-light btn-sm py-0'>text</button>))
  });

  test('Button.Litght onClick property works', () => {
    let buttonClicked = false
    const wrapper = shallow(<Button.Light onClick={()=>{buttonClicked = true}}>text</Button.Light>)

    expect(buttonClicked).toEqual(false)
    wrapper.simulate('click')
    expect(buttonClicked).toEqual(true)
  });

  test('Button.Danger widget draws correctly', () => {
    const wrapper = shallow(<Button.Danger>text</Button.Danger>)

    expect(wrapper.containsMatchingElement(<button className='btn btn-danger'>text</button>))
  });

  test('Button.Success widget draws correctly', () => {
    const wrapper = shallow(<Button.Success>text</Button.Success>)

    expect(wrapper.containsMatchingElement(<button className='btn btn-success'>text</button>))
  });
});

describe('Form.Input widget tests', () => {
  test('Form.Input draws correctly', () => {
    const wrapper = shallow(<Form.Input type='text' ></Form.Input>)

    expect(wrapper.containsMatchingElement(<input type='text' className='form-control'/>))
  });

  test('Form.Input draws correctly after onchange', () => {
    const wrapper = shallow(<Form.Input type='text' value='' ></Form.Input>)

    wrapper.simulate('change', {currentTarget: { value: 'test'} });
    expect(wrapper.containsMatchingElement(<input type='text' value='test' className='form-control'/>))
  });
});

describe('BrowseQuizzes tests', () => {
  test('', () => {
    const wrapper = shallow(<BrowseQuizzes />)

    expect()
  });
});