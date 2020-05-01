import React, { Component } from 'react';
import HomeNoToken from './HomeNoToken';
import HomeRegisterLogin from './HomeRegisterLogin';

class HomeRegister extends Component {
  token = this.props.token;
  
  render() {
    if (!this.token) {
      return (
        <HomeNoToken />
        )
      }
  
    return (
      <HomeRegisterLogin token={this.token} />
    );
  }
};

export default HomeRegister;