// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Home, BrowseQuizzes, NewQuiz, EditQuiz, ListQuizzes, playQuiz } from './kazoot-components'
import { Alert, NavBar } from './widgets'
import { HashRouter, Route } from 'react-router-dom';
import { quizService } from './kazoot-service';

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
      {/*Merge issue: <Route exact path="/quiz/new" component={NewQuiz}></Route>*/}
      <Route exact path="/newQuiz" component={NewQuiz}></Route>
      <Route exact path="/editQuiz/:id" component={EditQuiz}></Route>
      <Route exact path="/listQuizzes" component={ListQuizzes}></Route>
      <Route exact path="/playQuiz/:id" component={playQuiz}></Route>
    </div>
  </HashRouter>,
  root
);
