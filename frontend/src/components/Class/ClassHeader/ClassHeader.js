import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import agent from '../../../agent';
import { AUTH_LOGOUT } from '../../../constants/actionTypes';
import HeaderClass from '../../Header/HeaderLogin/HeaderClass';

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

class ClassHeader extends Component {
  logout = () => {
    this.props.logout(Promise.resolve(
      agent.Auth.logout()
    ))
  }

  renderTeacherTab(tabName) {
    if (this.props.auth.user.admin_id) {
      const id = this.props.match.params.id;
      const section = this.props.match.params.section;
      
      return(
        <li className="header-nav-item">
          <Link 
            to={"/class/"+id+"/"+tabName.toLowerCase()} 
            title={tabName}
            className={(tabName.toLowerCase() === section && "active")} 
          >{tabName}</Link>
        </li>
      )
    }
  }

  renderTab(tabName) {
    const id = this.props.match.params.id;
    const section = this.props.match.params.section;
    
    return(
      <li className="header-nav-item">
        <Link 
          to={"/class/"+id+"/"+tabName.toLowerCase()} 
          title={tabName}
          className={(tabName.toLowerCase() === section && "active")} 
        >{tabName}</Link>
      </li>
    )
  }

  render(){
    if (this.props.auth.user && this.props.auth.user.id) {
      return(
        <header className="App-header">
          <div>
            <nav className="header-nav">
              <ul>
                <li className="header-nav-item header-nav-dropdown"><a>Classes</a>
                  <HeaderClass />
                </li>
                <li className="header-nav-item"><Link to="/chat" title="Chat">Chat</Link></li>
                {this.renderTeacherTab("Home")}
                {this.renderTeacherTab("Students")}
                {this.renderTeacherTab("Rewards")}
                {this.renderTab("Shop")}
                {this.renderTab("Groups")}
              </ul>
            </nav>
          </div>
          <div className="long-filler"></div>
          <div>
            <nav className="header-nav">
              <ul>
              {this.renderTeacherTab("Settings")}
              </ul>
            </nav>
          </div>
          <div className="filler"></div>
          <div>
            <nav className="header-nav">
              <ul>
                <li className="header-nav-item"><Link to="/settings" title="Main Home">Main Home</Link></li>
                <li className="header-nav-item"><a className="active" onClick={this.logout} title="Logout">{this.props.auth.user.name}</a></li>
              </ul>
            </nav>
          </div>
        </header>
      )
    }
    
    return <Redirect to="/" />

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassHeader);