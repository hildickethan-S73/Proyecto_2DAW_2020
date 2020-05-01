import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register/:token" component={Home}/>
            <Redirect from="/register" to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
