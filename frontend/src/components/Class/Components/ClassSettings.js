import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import agent from '../../../agent';
import { CLASS_INVITATIONS_CHANGE } from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  classes: state.classes,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  changeField: (newChange) => dispatch({
    type: CLASS_INVITATIONS_CHANGE,
    payload: newChange
  }),
})

class ClassSettings extends Component {
  change = (event) => {
    const target  = event.target;
    this.props.changeField({
        target: target
    });
  }

  invite = () => {
    const currentClass = this.props.classes.class;
    
    const emailRegEx = new RegExp(/^([\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})(,[\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})*$/);
    let emails;
    let emailObj = [];
    if (this.props.classes.invitations) {
      if (emailRegEx.test(this.props.classes.invitations)) {
        emails = this.props.classes.invitations.split(",");
        emails.forEach(email => {
          emailObj.push({"name":email})
        });

        const paramsForEmail = {
          "emails": emailObj,
          "class": currentClass.name,
          "token": this.props.user.token
        }
        agent.Auth.inviteStudents(paramsForEmail)
      } else {
        console.error('bad invitations input')
      }
    } else {
      console.error('no invitations')
    }
  }
  render() {
    if (!this.props.user.admin_id) {
      return(
          <Redirect to="/" />
      )
    }
    return (
      <div className="height95 flex">
        <div className="filler" />
        <div className="settings-box flex flex-column">
          <div className="login-box">
            <h3>Class Settings</h3>
            <form>
              <h4>Invite more students</h4>
              <textarea className="form-item" name="invitations" value={this.props.classes.invitations || ""}  onChange={this.change} placeholder="student e-mails to invite, seperated by a ','" type="text"/>
              <input className="form-item button" onClick={this.invite} type="button" value="Invite" />
            </form>
          </div>
          <div className="long-filler" />
        </div>
        <div className="filler" />
      </div>
    )
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassSettings);