import React, { Component } from 'react';
import { connect } from "react-redux";
import agent from '../../../agent';
import { CLASS_GET_CLASSES } from '../../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state,
  classes: state.auth.classes,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  loadClasses: (data) => dispatch({
    type: CLASS_GET_CLASSES,
    payload: data
  })
})

class HeaderClass extends Component {
  constructor(props){
    super(props);

    const params = {
      "class_ids": this.props.user.class_ids,
      "token": this.props.user.token
    }
    
    this.props.loadClasses(Promise.resolve(
      agent.API.getMyClasses(params)
    ))
  }

  render() {
    if (!this.props.classes) {
      return (
        <ul className="header-nav-sub-menu">
          <li className="header-nav-subitem"><a>Loading classes</a></li>
        </ul>
      )
    }

    return (
      <ul className="header-nav-sub-menu">
        {this.props.classes.map((c) => <li key={c.id} className="header-nav-subitem"><a>{c.name}</a></li>)}
      </ul>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderClass);