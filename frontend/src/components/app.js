import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";
import CreateClass from "./CreateClass/CreateClass";
import Class from "./Class/Class";
import ClassHeader from "./Class/ClassHeader/ClassHeader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/class/:id/:section" component={ClassHeader}/>
          <Route path="*" component={Header}/>
        </Switch>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register/:token" component={Home}/>
            <Route exact path="/class/:id/:section" component={Class}/>
            <Redirect from="/class/:id/" to="/class/:id/home" />
            <Route exact path="/createclass" component={CreateClass}/>
            <Redirect from="/register" to="/" />
            <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
