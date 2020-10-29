// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Home, BrowseQuizzes, NewQuiz, EditQuiz, ListQuizzes } from './kazoot-components'
import { Alert, NavBar } from './widgets'
import { HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Kazoot">
        <NavBar.Link to="/BrowseQuizzes">Browse Quizzes</NavBar.Link>
        <NavBar.Link to="/quiz/new">New quiz</NavBar.Link>
        <NavBar.Link to="/editQuiz">TESTING: Endre quiz</NavBar.Link>
        <NavBar.Link to="/listQuizzes">TESTING: Kviss</NavBar.Link>
      </NavBar>
    );
  }
}


const root = document.getElementById('root');
if (root) 
ReactDOM.render(
   
  <HashRouter>
    <div>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/BrowseQuizzes" component={BrowseQuizzes}></Route>
      <Route exact path="/quiz/new" component={NewQuiz}></Route>
      <Route exact path="/editQuiz" component={EditQuiz}></Route>
      <Route exect path="/listQuizzes" component={ListQuizzes}></Route>
      </ div>
    </HashRouter>,
  root
);
