import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
})

class ClassRewards extends Component {  
  render() {
    if (!this.props.user.admin_id) {
      return(
          <Redirect to="/" />
      )
    }
    return (
      <div className="height95 flex flex-column class-rewards">
        <div className="row table-row table-row-header">
          <div className="col-2">Name</div>
          <div className="col-4">Description</div>
          <div className="col-2">Growth Effect</div>
        </div>
        <div className="row table-row">
          <div className="col-2">ethan hildick</div>
          <div className="col-4">asdasda asdasda</div>
          <div className="col-2">+100</div>
          <div className="col-1">
            <input type="button" className="button" value="Edit" />
          </div>
          <div className="col-1">
            <input type="button" className="button red" value="Delete" />
          </div>
        </div>
      </div>
    )
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassRewards);