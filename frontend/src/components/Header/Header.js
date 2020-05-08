import React, { Component } from 'react';
import { connect } from "react-redux";
import agent from '../../agent';
import HeaderNoLogin from './HeaderNoLogin';
import HeaderLogin from './HeaderLogin';
import { AUTH_LOGOUT } from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  logout: (loggedoutuser) => dispatch({
    type: AUTH_LOGOUT,
    payload: loggedoutuser
  }),
})

class Header extends Component {
  logout = () => {
    this.props.logout(Promise.resolve(
      agent.Auth.logout()
    ))
  }
  
  render() {
    if (this.props.auth.user && this.props.auth.user.id) {
      return(
        <HeaderLogin name={this.props.auth.user.name} logout={this.logout} />
      )
    }
    return (
      <HeaderNoLogin />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);