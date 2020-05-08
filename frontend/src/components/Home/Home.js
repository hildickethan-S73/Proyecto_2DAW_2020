import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeRegister from './HomeRegister';
import HomeLogin from './HomeLogin';

const mapStateToProps = (state) => ({
  ...state,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
})

class Home extends Component {
  render(){
    const token = this.props.match.params.token;
    
    if (this.props.auth.user && this.props.auth.user.id) {
      return(
        <div className="App-body">
          <Redirect from="/register/:token" to="/" />
          <div className="login-home">
            <div className="arrow">
              <div className="point"></div>
              <div className="line"></div>
            </div>
            <div className="filler" />
            <div><h1 className="home-text">Select a class to start</h1></div>
            <div className="filler" />
          </div>
        </div>
      )
    }

    return (
      <div className="App-body">
        <div className="login-home">
          <div className="filler" />
          <HomeLogin />
          <div className="filler" />
          <HomeRegister token={token} />
          <div className="filler" />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);