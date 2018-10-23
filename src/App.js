import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from "isomorphic-fetch";
import { Router, Route } from "react-router-dom"
import { history } from "./history/history";
import { AddEdit } from "./components/add-edit"
import { List } from "./components/list"

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={List}></Route>
          <Route exact path="/list" component={List}></Route>
          <Route exact path="/addedit/:id" component={AddEdit}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
