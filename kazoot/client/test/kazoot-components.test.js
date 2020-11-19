// @flow

import * as React from 'react';
import { Alert, Column, Button, Form, Card, CenterCard, AnswerCard } from '../src/widgets.js';
import { Component } from 'react-simplified';
import {BrowseQuizzes} from '../src/browsequizzes-components'
import { Home } from '../src/kazoot-components';
import { EditQuiz } from '../src/editquizzes-components';
import { NewQuiz } from '../src/newquiz-components';
import { PlayQuiz } from '../src/playquiz-components';
import { shallow } from 'enzyme';
import { quizService, questionService, categoryService } from '../src/kazoot-service';
import { type QuizType, type CategoryType, type QuestionType } from '../src/kazoot-service';


jest.mock('../src/kazoot-service', () => {
  class QuizService {
    getAllQuizzes(): Promise<QuizType[]> {
      return Promise.resolve([
        {id: 6, title: 'Hva er tall??', description: 'Vi omgås tall. Hva er tall?', categoryId: 2},
        {id: 77, title: 'Matte #1', description: 'Sjekk kunnskapen din i grunnleggende matte!', categoryId: 1}
      ]);
    }
  }
  
  class QuestionService {
    getAllQuestions(): Promise<QuestionType[]> {
      return Promise.resolve([
        {id: 6, quizId: 1, question: 'Hva er tall??', answ0: 'Vi omgås tall. Hva er tall?', answ1: 'Vi omgås tall. Hva er tall?', answ2: 'Vi omgås tall. Hva er tall?', answ3: 'Vi omgås tall. Hva er tall?', numCorrect: 2},
        {id: 2, quizId: 1, question: 'Hva er tall??', answ0: 'Vi omgås tall. Hva er tall?', answ1: 'Vi omgås tall. Hva er tall?', answ2: 'Vi omgås tall. Hva er tall?', answ3: 'Vi omgås tall. Hva er tall?', numCorrect: 2},
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

  return (new QuizService(), new QuestionService(), new CategoryService());
});

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

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


describe('Card widget tests', () => {

  test('Card widget drawd correctly', () => {
    const wrapper = shallow(<Card >text</Card>);
  
    expect(wrapper.containsMatchingElement(
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"></h5>
          <div className="card-text">text</div>
        </div>
      </div>  
    ))
  })

  test('Card draws correctly with title', () => {
    const wrapper = shallow(<Card title='title'>text</Card>);
  
    expect(wrapper.containsMatchingElement(
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">title</h5>
          <div className="card-text">text</div>
        </div>
      </div>  
    ))
  })
})

describe('CenterCard widget tests', () => {
  test('CenterCard widget draws corectly', () => {
    const wrapper = shallow(<CenterCard>text</CenterCard>);

    expect(wrapper.containsMatchingElement(
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh', marginBottom: '1vh' }}>
          <h3 className="card-title"></h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1vh', marginBottom: '10vh' }}>
          <div className="card-text">text</div>
          </div>
        </div>
      </div>
    ))
  })

  test('CenterCard with titel', () => {
    const wrapper = shallow(<CenterCard title='title'>text</CenterCard>);

    expect(wrapper.containsMatchingElement(
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh', marginBottom: '1vh' }}>
          <h3 className="card-title"></h3>title
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1vh', marginBottom: '10vh' }}>
          <div className="card-text">text</div>
          </div>
        </div>
      </div>
    ))
  })
})

describe('AnswerCard widget tests', () => {
  test('AnswerCard widget draws correctly', () => {
    const wrapper = shallow(<AnswerCard parentCallBack={1}>text</AnswerCard>);

    expect(wrapper.containsMatchingElement(

      <center>
        <div className="card" style={{ width: '26rem' }}>
          <div className="card-body" align="center">
            <h5 className="card-title">title</h5>
            <hr />
            <div className="card-text">
              text
              <Button.Answer
                style={this.selectStyle[0]}
                onClick={this.stil.bind(this, 1, this.props.answ0[1])}
                show={this.props.show}
                correct={this.props.answ0[1]}
              >
                {this.props.answ0[0]}
              </Button.Answer>
              &nbsp;&nbsp;&nbsp;
              <Button.Answer
                style={this.selectStyle[1]}
                onClick={this.stil.bind(this, 2, this.props.answ1[1])}
                show={this.props.show}
                correct={this.props.answ1[1]}
              >
                {this.props.answ1[0]}
              </Button.Answer>
              <button type="button" style={this.props.style} onClick={this.props.onClick} class={ButtonClass}>{this.props.children}</button>
              &nbsp;&nbsp;&nbsp;
              <Button.Answer
                style={this.selectStyle[2]}
                onClick={this.stil.bind(this, 3, this.props.answ2[1])}
                show={this.props.show}
                correct={this.props.answ2[1]}
              >
                {this.props.answ2[0]}
              </Button.Answer>
              &nbsp;&nbsp;&nbsp;
              <Button.Answer
                style={this.selectStyle[3]}
                onClick={this.stil.bind(this, 4, this.props.answ3[1])}
                show={this.props.show}
                correct={this.props.answ3[1]}
              >
                {this.props.answ3[0]}
              </Button.Answer>
            </div>
          </div>
        </div>
      </center>
    ))
  })
})




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


  test('Button.Submit widget draws correctly', () => {
    const wrapper = shallow(<Button.Submit>text</Button.Submit>)

    expect(wrapper.containsMatchingElement( 
      <div style={ { width: '100vh', marginLeft: '25%', marginRight: '25%', flex: '1', flexDirection: 'column'} }>
        <button type="button" class="btn btn-outline-primary btn-large btn-block">text</button>
      </div>
    ))
  });

  test('Button.Back widget draws correctly', () => {
    const wrapper = shallow(<Button.Back>text</Button.Back>)

    expect(wrapper.containsMatchingElement(
      <button 
      type="button" class="btn btn-outline-danger btn-large btn-block"
      >text</button>
    ));
  });

  test('Button.Save widget draes correctly', () => {
    const wrapper = shallow(<Button.Save>text</Button.Save>)
    
    expect(wrapper.containsMatchingElement(
      <button 
      type="button" class="btn btn-outline-success btn-large btn-block"
      >text</button>
    ));
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
         <div style={ { width: '100vh', marginLeft: '25%', marginRight: '25%', flex: '1', flexDirection: 'column'} }>
         <button 
          type="button" class="btn btn-success btn-lg btn-block"
          onClick={() => history.push('/BrowseQuizzes')}>
            Browse Quizzes{' '} 
         </button>
         </div>
      )
    );

    expect(
      wrapper.containsMatchingElement(
         <div style={ { width: '100vh', marginLeft: '25%', marginRight: '25%', flex: '1', flexDirection: 'column'} }>
         <button 
          type="button" class="btn btn-success btn-lg btn-block"
          onClick={() => {history.push('/quiz/new')}}>
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

describe('Browsequizzes-Component tests', () => {
  test('BrowseQuiz-Component draws correctly', () => {

  })
})

describe('NewQuiz-Component tests', () => {

  test('New quiz draws correctly', () => {
    const wrapper = shallow(<NewQuiz />)
    console.log(wrapper.debug())

    expect(
      wrapper.containsMatchingElement(
        <QuizEditor cardtitle='📣 Creating a new quiz! 📣' mode='new'/>
      ))
  });
});

describe('EditQuiz-Component tests', () => {
  test('Edit Quiz draws correctly', () => {

  })
})


describe('PlayQuiz-Component tests', () => {
  test('PlayQuiz-Component draws correctly', () => {

  })
})