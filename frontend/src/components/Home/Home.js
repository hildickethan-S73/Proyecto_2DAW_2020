import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeRegister from './HomeRegister';

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
})

class Home extends Component {
  render(){
    const token = this.props.match.params.token;
    
    return (
      <div className="App-body">
        <div className="login-home">
          <div className="filler" />
          <HomeRegister token={token} />
          <div className="filler" />
          <div className="login-box">
            <h3>Login</h3>
            <form>
              <input className="form-item" placeholder="username" type="text"/>
              <input className="form-item" placeholder="password" type="password"/>
              <input className="form-item login-button" type="button" value="Login" />
            </form>
          </div>
          <div className="filler" />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);