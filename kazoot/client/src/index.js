// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Home, BrowseQuizzes, NewQuiz, EditQuiz } from './kazoot-components'
import { Alert, NavBar } from './widgets'
import { HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Kazoot">
        <NavBar.Link to="/BrowseQuizes">Browse Quiz</NavBar.Link>
        <NavBar.Link to="/newQuiz">Ny quiz</NavBar.Link>
        <NavBar.Link to="/editQuiz">Endre quiz</NavBar.Link>
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
      <Route exact path="/BrowseQuizes" component={BrowseQuizzes}></Route>
      <Route exact path="/newQuiz" component={NewQuiz}></Route>
      <Route exact path="/editQuiz" component={EditQuiz}></Route>
      </ div>
    </HashRouter>,
  root
);
