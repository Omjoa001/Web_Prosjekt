// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Card, TileCard, Row, Button, Form, Column, Alert, NavBar } from './widgets';
import { quizService, questionService, categoryService } from './kazoot-service';

const history = createHashHistory();

export class Home extends Component {
  sprs: Kvisser[] = [];
  question: string = '';
  id: number = 0;

  render() {
    return (
      <>
        <Card title="Welcome">This is Quiz App</Card>
        <Card title="spørsmål">
          {this.sprs.map((spr) => (
            <Row key={spr.id}>
              <Column>{spr.question}</Column>
            </Row>
          ))}
        </Card>
        <Card title="Route test">
            <Button.Light
            onClick={()=> history.push('/')}
            >
                Back
            </Button.Light>
            <Button.Danger
            onClick={() => history.push('/Browse')}
            >
                Browse 
            </Button.Danger>
            <Button.Light
            onClick={() => {
                history.push("/newQuiz")
            }
            }
            >
                Ny quiz
            </Button.Light>
            <Button.Success
            onClick={()=> history.push("/editQuiz")}
            >
                Endre quiz
            </Button.Success>
        </Card>
      </>
    );
  }

  mounted() {
    questionService.getAll().then((sprs) => (this.sprs = sprs));
  }
}

export class NewQuiz extends Component {
  render() {
    return (
        <>
        <Card title="New Quiz!">
            <Row>
                <Column width={3}>
                    Quiz-title:
                </Column>
                <Column>
                    <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                </Column>  
                <Column>
                </Column>
            </Row>    
            <Row>
                <Column width={3}>
                    Quiz-description:
                </Column>
                <Column >
                    <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                </Column>
                <Column>
                </Column>
            </Row>      
            <Row>
                <Column width={3}>
                    Quiz-Category:
                </Column>
                <Column >
                    <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                </Column>
                <Column>
                </Column>
            </Row>      
            <Card>
                <Row>
                    <Column width={2}>
                        Riktig:
                    </Column>
                    <Column >
                        <Form.Input placeholder="spørsmål" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar1" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar2" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>  
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar3" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox ></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar4" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column >
                        <Button.Success  >+</Button.Success>
                    </Column>
                </Row>
            </Card>
            <Row>
                <Button.Success onClick={this.button}>Nytt spørsmål</Button.Success>
            </Row>
            <Row>
                <Button.Light onClick={()=> history.push('/')}>
                    Back
                </Button.Light>
                <Column>
                    <Button.Success>Save</Button.Success>
                </Column>
            </Row>
        </Card>

      </>
    );
  }
}

export class BrowseQuizzes extends Component {
  // dummy quiz array
  quizzes: Quiz[] = [
    {
      title: 'quiz 1',
      id: 1,
      category: 1,
    },
    {
      title: 'quiz 2',
      id: 2,
      category: 2,
    },
    {
      title: 'quiz 3',
      id: 3,
      category: 3,
    },
  ];
  categories: number[] = [];

  render() {
    return (
      <>
        <Card title="Categories">{this.categories}</Card>
        <Card title="Search"></Card>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Row key={quiz.id}>
              <Column>
                <Quiz id={quiz.id} title={quiz.title}></Quiz>
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
              </Column>
            </Row>
          ))}
            <Button.Light onClick={()=> history.push('/')}>
                Back
            </Button.Light>
        </Card>
      </>
    );
  }

  mounted() {
    categoryService.getAll().then((categories) => (this.categories = categories));
  }
}

/**
 * Quiz component.
 * Should be called with an id.
 */
export class Quiz extends Component {
  title: string = 'hei';
  id: number = 0;

  render() {
    return (
      <>
        <TileCard title={this.props.title}>
          <Row>
            <Column left>
              <Button.Success>Play</Button.Success>
            </Column>
            <Column right>
              <Button.Danger>Edit</Button.Danger>
            </Column>
          </Row>
        </TileCard>
      </>
    );
  }

  mounted() {
    // quizService.getQuizInfo(this.props.id).then((quiz) => (this.props.title = quiz.title));
  }
}

export class EditQuiz extends Component {
  render() {
    return (
      <>
        <Card title="Edit Quiz">
            <Row>
                <Column width={3}>
                    Quiz-title:
                </Column>
                <Column>
                    <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                </Column>
                <Column >                    
                    <Button.Danger onClick={this.button()}>SLETT QUIZ</Button.Danger>
                </Column>
                
            </Row>    
            <Row>
                <Column width={3}>
                    Quiz-description:
                </Column>
                <Column >
                    <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                </Column>
                <Column>
                </Column>
            </Row>      
            <Row>
                <Column width={3}>
                    Quiz-Category:
                </Column>
                <Column >
                    <Form.Input onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                </Column>
                <Column>
                </Column>
            </Row>      
            <Card>
                <Row>
                    <Column width={2}>
                        Riktig:
                    </Column>
                    <Column>
                        <Form.Input placeholder="spørsmål" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar1" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar2" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>  
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar3" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Checkbox></Form.Checkbox>
                    </Column>
                    <Column>
                        <Form.Input placeholder="Svar4" onChange={(event) => (this.quiz = event.currentTarget.value)} value={this.quiz}></Form.Input>
                    </Column>
                    <Column>
                        <Button.Danger>X</Button.Danger>
                    </Column>
                </Row>
                <Row>
                    <Column center>
                        <Button.Success  >+</Button.Success>
                    </Column>
                </Row>
            </Card>
            <Row>
                <Button.Success onClick={this.button}>Nytt spørsmål</Button.Success>
            </Row>
            <Row>
                <Button.Light onClick={()=> history.push('/')}>
                    Back
                </Button.Light>
                <Column>
                    <Button.Success>Save</Button.Success>
                </Column>
            </Row>        
        </Card>

      </>
    );
  }

  mounted() {}

  button() {
      console.log("LOL")
  }
}

/*
{this.tasks.map((task) => (
            <Row key={task.id}>
              <Column>
                <NavLink to={'/tasks/' + task.id}>{task.title}</NavLink>
              </Column>
            </Row>
          ))}
*/

export class ListQuizzes extends Component {
    quizzes: Kvisser[] =[];

    render() {
        return (
            <>
        <Card title="Categories">{this.categories}</Card>
        <Card title="Search"></Card>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Row key={quiz.id}>
              <Column>
                {quiz.title}
                {quiz.id}
                {/* <NavLink to={'/quizzes/' + quiz.id}>{quiz.title}</NavLink> */}
              </Column>
            </Row>
          ))}
            <Button.Light onClick={()=> history.push('/')}>
                Back
            </Button.Light>
        </Card>
      </>
        )
    }
    mounted() {
        questionService.getAll().then((categories) => (this.questions = categories));
      }
}