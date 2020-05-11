import React, { Component } from 'react';
import HomeNoToken from './HomeNoToken';
import HomeToken from './HomeToken';

class HomeRegister extends Component {
  token = this.props.token;
  
  render() {
    if (!this.token) {
      return (
        <HomeNoToken />
        )
      }
  
    return (
      <HomeToken token={this.token} />
    );
  }
};

export default HomeRegister;