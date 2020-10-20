// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
import { TaskList, TaskDetails, TaskEdit, TaskNew } from './task-components';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Todo App">
        <NavBar.Link to="/tasks">Tasks</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">This is Todo App</Card>;
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
        <Route exact path="/tasks" component={TaskList} />
        <Route exact path="/tasks/:id(\d+)" component={TaskDetails} /> {/* id must be number */}
        <Route exact path="/tasks/:id(\d+)/edit" component={TaskEdit} /> {/* id must be number */}
        <Route exact path="/tasks/new" component={TaskNew} />
      </div>
    </HashRouter>,
    root
  );
