import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import agent from '../../agent';
import { AUTH_CHANGE, AUTH_LOAD_NEWUSER, AUTH_LOGIN } from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  changeField: (newchange) => dispatch({
    type: AUTH_CHANGE,
    payload: newchange
  }),
  loadObject: () => dispatch({
    type: AUTH_LOAD_NEWUSER
  }),
  login: returnedUser => dispatch({
    type: AUTH_LOGIN,
    payload: returnedUser
  })
})

class HomeLogin extends Component {
  constructor(props){
    super(props);
    this.props.loadObject();
  }

  change = (event) => {
      const target  = event.target;
      this.props.changeField({
          newuser: this.props.auth.newuser,
          target: target
      });
  }

  login = () => {
      const user = this.props.auth.newuser;

      if (user.name && user.password) {
          this.props.login(Promise.resolve(
              agent.Auth.login(user)
          ))
      } else {
          console.error('missing fields')
      }
  }

  render() {
    if (this.props.auth.user && this.props.auth.user.id) {
      return(
          <Redirect to="/" />
      )
    }

    if (!this.props.auth.newuser) {
        return (
            <div className="login-box">
              <h3>Loading...</h3>
            </div>
        )
    }
    return (
      <div className="login-box">
        <h3>Login</h3>
        <form>
          <input className="form-item" name="name" value={this.props.auth.newuser.name || ""} onChange={this.change} placeholder="username" type="text"/>
          <input className="form-item" name="password" value={this.props.auth.newuser.password || ""} onChange={this.change} placeholder="password" type="password"/>
          <div>
            <label><input onChange={this.change} className="form-item" value="student" name="type" type="radio" defaultChecked /> Student</label>
            <label><input onChange={this.change} className="form-item" value="teacher" name="type" type="radio" /> Teacher</label>
          </div> 
          <input className="form-item button" onClick={this.login} type="button" value="Login" />
        </form>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLogin);