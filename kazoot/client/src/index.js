// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { ListQuizzes} from './listquizzes-components.js';
import { Home } from './kazoot-components'
import { Alert, NavBar } from './widgets'
import { HashRouter, Route } from 'react-router-dom';
import { quizService } from './kazoot-service';
import { BrowseQuizzes } from './browsequizzes-components';
import { NewQuiz } from './newquiz-components';
import { EditQuiz } from './editquizzes-components';
import { PlayQuiz } from './playquiz-components';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Kazoot">
        <NavBar.Link to="/BrowseQuizzes">Browse Quizzes</NavBar.Link>
        <NavBar.Link to="/quiz/new">New quiz</NavBar.Link>
        <NavBar.Link to={"/editQuiz/" + 2}>TESTING: Endre quiz</NavBar.Link>
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
      <Route exact path="/editQuiz/:id(\d+)" component={EditQuiz}></Route>
      <Route exact path="/listQuizzes" component={ListQuizzes}></Route>
      <Route exact path="/playQuiz/:id(\d+)" component={PlayQuiz}></Route>
    </div>
  </HashRouter>,
  root
);
