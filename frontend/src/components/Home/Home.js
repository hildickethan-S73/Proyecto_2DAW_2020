import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeRegister from './HomeRegister/HomeRegister';
import HomeLogin from './HomeLogin';
import { CLASS_UNLOAD_NEWCLASS, CLASS_UPDATE_CLASSES } from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state,
  auth: state.auth,
  newClass: state.createClass
})

const mapDispatchToProps = (dispatch) => ({
  updateClasses: (data) => dispatch({
    type: CLASS_UPDATE_CLASSES,
    payload: data
  }),
  wipeCreateClass: () => dispatch({
    type: CLASS_UNLOAD_NEWCLASS
  })
})

class Home extends Component {
  componentWillMount() {
    if (this.props.newClass.class) {
      this.props.updateClasses(this.props.newClass.class)
      this.props.wipeCreateClass()
    }
  }

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