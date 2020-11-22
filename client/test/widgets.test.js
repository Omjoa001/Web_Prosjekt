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
  CardSmaller,
} from '../src/widgets.js';
import { Component } from 'react-simplified';
import { Home, Question, QuizEditor } from '../src/kazoot-components';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';


describe('Alert tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<></>)).toEqual(true);
  });

  test.skip('Show alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>x</button>
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
              test<button>×</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').simulate('click');

      expect(wrapper.matchesElement(<></>)).toEqual(true);

      done();
    });
  });

  test('Open 3 alert messages, and close the second alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test1');
    Alert.danger('test2');
    Alert.danger('test3');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test1<button>×</button>
            </div>
            <div>
              test2<button>×</button>
            </div>
            <div>
              test3<button>×</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').at(1).simulate('click');

      expect(
        wrapper.matchesElement(
          <>
            <div>
              test1<button>×</button>
            </div>
            <div>
              test3<button>×</button>
            </div>
          </>
        )
      ).toEqual(true);
      done();
    });
  });

  test('Alert.success draws correctly', () => {
    const wrapper = shallow(<Alert.success>text</Alert.success>);

    setTimeout(() => {
      expect(
        wrapper.containsMatchingElement(
          <div className={'alert alert-success'} role="alert">
            text
            <button type="button" className="close" onClick={() => {}}>
              &times;
            </button>
          </div>
        )
      ).toEqual(true);
    });
  });



  test('Alert.danger draws correctly', () => {
    const wrapper = shallow(<Alert.danger>text</Alert.danger>);

    setTimeout(() => {
      expect(
        wrapper.containsMatchingElement(
          <div className={'alert alert-danger'} role="alert">
            text
            <button type="button" className="close" onClick={() => {}}>
              &times;
            </button>
          </div>
        )
      ).toEqual(true);
    });
  });
});

describe('Column Widgets tests', () => {
  test('Column Widget draws correctly', () => {
    const wrapper = shallow(<Column>text</Column>);

    expect(wrapper.containsMatchingElement(<div className="col">text</div>)).toEqual(true);
  });

  test('Column Widget draws correctly with width prperty set', () => {
    const wrapper = shallow(<Column width={3}>text</Column>);

    expect(wrapper.containsMatchingElement(<div className="col-3">text</div>)).toEqual(true);
  });

  test('Column Widget draws correctly right', () => {
    const wrapper = shallow(<Column right>text</Column>);

    expect(wrapper.containsMatchingElement(<div className="col text-right">text</div>)).toEqual(
      true
    );
  });

  test('Column Widget draws correctly left', () => {
    const wrapper = shallow(<Column left>text</Column>);

    expect(wrapper.containsMatchingElement(<div className="col text-left">text</div>)).toEqual(
      true
    );
  });
});

describe('Card widget tests', () => {
  test('Card widget drawd correctly', () => {
    const wrapper = shallow(<Card>text</Card>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"></h5>
            <div className="card-text">text</div>
          </div>
        </div>
      )
    );
  });

  test('Card draws correctly with title', () => {
    const wrapper = shallow(<Card title="title">text</Card>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">title</h5>
            <div className="card-text">text</div>
          </div>
        </div>
      )
    );
  });
});

describe('CenterCard widget tests', () => {
  test('CenterCard widget draws corectly', () => {
    const wrapper = shallow(<CenterCard>text</CenterCard>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card">
          <div className="card-body">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10vh',
                marginBottom: '1vh',
              }}
            >
              <h3 className="card-title"></h3>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1vh',
                marginBottom: '10vh',
              }}
            >
              <div className="card-text">text</div>
            </div>
          </div>
        </div>
      )
    );
  });

  test('CenterCard widget draws correctly with titel', () => {
    const wrapper = shallow(<CenterCard title="title">text</CenterCard>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card">
          <div className="card-body">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10vh',
                marginBottom: '1vh',
              }}
            >
              <h3 className="card-title"></h3>title
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1vh',
                marginBottom: '10vh',
              }}
            >
              <div className="card-text">text</div>
            </div>
          </div>
        </div>
      )
    );
  });

  test('CardSmaller', () => {
    const wrapper = shallow(<CardSmaller>text</CardSmaller>)

    expect(wrapper.containsMatchingElement(
      <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh', marginBottom: '5vh'}}>
          <h1 className="card-title">text</h1>
          </div>
      </div>
    ))
  })


});


describe('LayoutCenter widget tests', () => {
  test('LayoutCenter widget draws correctly', () => {
    const wrapper = shallow(<LayoutCenter title="title">text</LayoutCenter>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card-body">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10vh',
              marginBottom: '1vh',
            }}
          >
            <h1 className="card-title">title</h1>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1vh',
              marginBottom: '10vh',
            }}
          >
            <h3 className="card-text">text</h3>
          </div>
        </div>
      )
    );
  });
});

describe('TileCard widget tests', () => {
  test('TileCard widget draws correctly', () => {
    const wrapper = shallow(<TileCard title="title">text</TileCard>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card" style={{ width: '12rem' }}>
          <div className="card-body" align="center">
            <h5 className="card-title">title</h5>
            <div className="card-text">text</div>
          </div>
        </div>
      )
    );
  });
});

describe('QuestionCard tests', () => {
  test('QuestionCard draws correctly', () => {
    const wrapper = shallow(<QuestionCard titel="title">text</QuestionCard>);

    expect(
      wrapper.containsMatchingElement(
        <div className="card" style={{ width: '50rem' }}>
          <div className="card-body" align="center">
            <h5 className="card-title">titel</h5>
            <div className="card-text">text</div>
          </div>
        </div>
      )
    );
  });
});

describe('Row widget tests', () => {
  test('Row widget draws correctly', () => {
    const wrapper = shallow(<Row>text</Row>);

    expect(wrapper.containsMatchingElement(<div className="col">text</div>));
  });

  test('Row widget draws correctly with width property set', () => {
    const wrapper = shallow(<Row width={3}>text</Row>);

    expect(wrapper.containsMatchingElement(<div className="col-2">text</div>));
  });

  test('Row widget draws correctly with right property set', () => {
    const wrapper = shallow(<Row right>text</Row>);

    expect(wrapper.containsMatchingElement(<div className="col text-right">text</div>));
  });

  test('Row widget draws correctly with left property set', () => {
    const wrapper = shallow(<Row left>text</Row>);

    expect(wrapper.containsMatchingElement(<div className="col text-left">text</div>));
  });
});

/**
 *
 *
 *
 * BUTTON TESTss
 *
 *
 */

describe('Button widget tests', () => {
  test('Button.Light widget draws correctly', () => {
    const wrapper = shallow(<Button.Light>text</Button.Light>);

    expect(wrapper.containsMatchingElement(<button className="btn btn-light">text</button>));
  });

  test('Button.Light widget draws correctly with small property set', () => {
    const wrapper = shallow(<Button.Light small>text</Button.Light>);

    expect(
      wrapper.containsMatchingElement(<button className="btn btn-light btn-sm py-0">text</button>)
    );
  });

  test('Button.Litght onClick property works', () => {
    let buttonClicked = false;
    const wrapper = shallow(
      <Button.Light
        onClick={() => {
          buttonClicked = true;
        }}
      >
        text
      </Button.Light>
    );

    expect(buttonClicked).toEqual(false);
    wrapper.simulate('click');
    expect(buttonClicked).toEqual(true);
  });

  test('Button.Danger widget draws correctly', () => {
    const wrapper = shallow(<Button.Danger>text</Button.Danger>);

    expect(wrapper.containsMatchingElement(<button className="btn btn-danger">text</button>));
  });

  test('Button.Success widget draws correctly', () => {
    const wrapper = shallow(<Button.Success>text</Button.Success>);

    expect(wrapper.containsMatchingElement(<button className="btn btn-success">text</button>));
  });

  test('Button.Submit widget draws correctly', () => {
    const wrapper = shallow(<Button.Submit>text</Button.Submit>);

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
          <button type="button" class="btn btn-outline-primary btn-large btn-block">
            text
          </button>
        </div>
      )
    );
  });

  test('Button.Back widget draws correctly', () => {
    const wrapper = shallow(<Button.Back>text</Button.Back>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" class="btn btn-outline-danger btn-large btn-block">
          text
        </button>
      )
    );
  });

  test('Button.Save widget draws correctly', () => {
    const wrapper = shallow(<Button.Save>text</Button.Save>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" class="btn btn-outline-success btn-large btn-block">
          text
        </button>
      )
    );
  });

  test.skip('Button.Answer widget drawss correctly', () => {
    const wrapper = shallow(<Button.Answer style={{border: ''}} onClick={()=>{}}>text</Button.Answer>);
  });

  test('Button.start widget draws correctly', () => {
    const wrapper = shallow(<Button.Start>text</Button.Start>);

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
          <button type="button" class="btn btn-success btn-lg btn-block">
            text
          </button>
        </div>
      )
    );
  });

  test('ButtonOutlinePrimary widget draws correctly', () => {
    const wrapper = shallow(<Button.OutlinePrimary>text</Button.OutlinePrimary>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-outline-primary">
          text
        </button>
      )
    );
  });

  test('ButtonOutlinePrimary draws correctly with small property set ', () => {
    const wrapper = shallow(<Button.OutlinePrimary small>text</Button.OutlinePrimary>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-outline-primary btn-sm py-0">
          text
        </button>
      )
    );
  });

  test('Button.Primary draws correctly', () => {
    const wrapper = shallow(<Button.Primary>text</Button.Primary>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-primary">
          text
        </button>
      )
    );
  });

  test('Button.Primary widget draws correctly with small property set', () => {
    const wrapper = shallow(<Button.Primary small>text</Button.Primary>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-primary btn-sm py-0">
          text
        </button>
      )
    );
  });
});

describe('Form widget tests', () => {
  test('Form.Input draws correctly', () => {
    const wrapper = shallow(<Form.Input type="text"></Form.Input>);

    expect(wrapper.containsMatchingElement(<input type="text" className="form-control" />));
  });

  test('Form.Input widget draws correctly after onchange', () => {
    const wrapper = shallow(<Form.Input type="text" value=""></Form.Input>);

    wrapper.simulate('change', { currentTarget: { value: 'test' } });
    expect(
      wrapper.containsMatchingElement(<input type="text" value="test" className="form-control" />)
    );
  });

  test('Form.Label widget draws correctly', () => {
    const wrapper = shallow(<Form.Label>text</Form.Label>);

    expect(wrapper.containsMatchingElement(<label className="col-form-label">text</label>));
  });

  test('Form.Textarea widget draws correctly', () => {
    const wrapper = shallow(<Form.Textarea value="" onChange={() => {}}></Form.Textarea>);

    expect(
      wrapper.containsMatchingElement(
        <textarea className="form-control" value={''} onChange={() => {}} />
      )
    );
  });

  test('Form.CheckBox widget draws correctly', () => {
    const wrapper = shallow(<Form.Checkbox></Form.Checkbox>);

    expect(wrapper.containsMatchingElement(<input type="checkbox" />));
  });

  test('Form.Select widget draws correctly', () => {
    const wrapper = shallow(
      <Form.Select value="" onChange={() => {}}>
        text
      </Form.Select>
    );

    expect(
      wrapper.containsMatchingElement(
        <select className="custom-select" value={''} onChange={() => {}}>
          text
        </select>
      )
    );
  });
});

describe('Navbar widgets tests', () => {
  test('Navbar.Link draws correctly', () => {
    const wrapper = shallow(<NavBar.Link to="/BrowseQuizzes">text</NavBar.Link>);

    expect(
      wrapper.containsMatchingElement(
        <NavLink className="nav-link" activeClassName="active" to="/BrowseQuizzes">
          text
        </NavLink>
      )
    );
  });

  test('NavBar draws correclty', () => {
    const wrapper = shallow(<NavBar>text</NavBar>);

    expect(
      wrapper.containsMatchingElement(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          {<NavLink className="navbar-brand" activeClassName="active" exact to="/"></NavLink>}
          <ul className="navbar-nav">text</ul>
        </nav>
      )
    );
  });
});