import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import agent from '../../agent';
import { CREATECLASS_CHANGE, CREATECLASS_LOAD_NEWCLASS, CREATECLASS_CREATE } from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state,
  createClass: state.createClass,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  changeField: (newChange) => dispatch({
    type: CREATECLASS_CHANGE,
    payload: newChange
  }),
  loadObject: () => dispatch({
    type: CREATECLASS_LOAD_NEWCLASS
  }),
  createClassF: returnedClass => dispatch({
    type: CREATECLASS_CREATE,
    payload: returnedClass
  })
})

class CreateClass extends Component {
  constructor(props){
    super(props);
    this.props.loadObject();
  }

  change = (event) => {
    const target  = event.target;
    this.props.changeField({
        newClass: this.props.createClass.newClass,
        target: target
    });
  }

  create = () => {
    const newClass = this.props.createClass.newClass;
    
    if (newClass.name) {
      const params = {
        "name": newClass.name,
        "token": this.props.user.token
      }
      this.props.createClassF(Promise.resolve(
        agent.API.createClass(params)
      ))
    } else {
        console.error('missing fields')
    }
  }
  
  render() {
    console.log(this.props.createClass);
    
    if (!this.props.user) {
      return(
          <Redirect to="/" />
      )
    }

    if (!this.props.user.admin_id) {
      return(
          <Redirect to="/" />
      )
    }
    
    if (!this.props.createClass.newClass) {
      return (
        <div className="App-body">
          <div className="login-home">
            <div className="filler" />
            <h3>Loading...</h3>
            <div className="filler" />
          </div>
          {this.props.createClass.class && <Redirect to="/" />}
        </div>
      )
  }

    return (
      <div className="App-body">
        <div className="login-home">
          <div className="filler" />
          <div className="login-box">
            <h3>Create Class</h3>
            <form>
              <input className="form-item" name="name" value={this.props.createClass.newClass.name || ""}  onChange={this.change} placeholder="class name" type="text"/>
              <input className="form-item button" onClick={this.create}  type="button" value="Create" />
            </form>
          </div>
          <div className="filler" />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);