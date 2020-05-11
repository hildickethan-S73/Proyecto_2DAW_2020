import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import agent from '../../../agent';
import { AUTH_CHANGE_REGISTER, AUTH_REGISTER, AUTH_LOAD_NEWUSER_REGISTER } from '../../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state,
  auth: state.auth
})
  
const mapDispatchToProps = (dispatch) => ({
  changeField: (newchange) => dispatch({
    type: AUTH_CHANGE_REGISTER,
    payload: newchange
  }),
  loadObject: () => dispatch({
    type: AUTH_LOAD_NEWUSER_REGISTER
  }),
  register: returnedUser => dispatch({
    type: AUTH_REGISTER,
    payload: returnedUser
  }),
})

class HomeToken extends Component {
  constructor(props){
    super(props);
    this.props.loadObject();
  }
  change = (event) => {
    const target  = event.target;
    this.props.changeField({
      new_user_register: this.props.auth.new_user_register,
      target: target
    });
  }

  register = () => {
    let user = this.props.auth.new_user_register;
    const token = this.props.token;

    if (user.password === user.confirmpassword) {
      if (user.name && user.password && user.email) {
        user.code = token;
        user.confirmpassword = "";
        this.props.register(Promise.resolve(
          agent.Auth.register(user)
        ))
      } else {
        console.error('missing fields')
      }
    } else {
      console.error('passwords dont match')
    }
  }

  render(){
    if (this.props.auth.user && this.props.auth.user.id) {
      return(
        <Redirect to="/" />
      )
    }
    
    if (!this.props.auth.new_user_register) {
      return (
        <div>Loading...</div>
      )
    }

    return(
      <div className="login-box">
        <h3>Register</h3>
        <form>
          <input className="form-item" name="name" value={this.props.auth.new_user_register.name || ''} onChange={this.change} placeholder="username" type="text"/>
          <input className="form-item" name="email" value={this.props.auth.new_user_register.email || ''} onChange={this.change} placeholder="email" type="email"/>
          <input className="form-item" name="password" value={this.props.auth.new_user_register.password || ''} onChange={this.change} placeholder="password" type="password"/>
          <input className="form-item" name="confirmpassword" value={this.props.auth.new_user_register.confirmpassword || ''} onChange={this.change} placeholder="confirm password" type="password"/>
          <input className="form-item button" onClick={this.register} type="button" value="Register" />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeToken);