import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  classes: state.classes
})

const mapDispatchToProps = (dispatch) => ({
})

class ClassStudents extends Component {  
  calcPercent(growth) {
    let growthToLevel = (Math.floor(growth/100)*100)+100;
    let normalizedGrowth = (growth-(growthToLevel-100));
    return normalizedGrowth;
  }

  render() {
    if (!this.props.user.admin_id) {
      return(
          <Redirect to="/" />
      )
    }
    
    return (
      <div className="height95 flex flex-column class-student">
        <div className="row table-row table-row-header">
          <div className="col-1">Student ID</div>
          <div className="col-2">Name</div>
          <div className="col-2">Email</div>
          <div className="col-1">Level</div>
          <div className="col-1">Progress</div>
        </div>
        { this.props.classes.students
            && this.props.classes.students.map((s,i) => 
              <div className="row table-row" key={s.id}>
                <div className="col-1">{s.id}</div>
                <div className="col-2">{s.name}</div>
                <div className="col-2">{s.email}</div>
                <div className="col-1">{Math.floor(s.growth/100)+1}</div>
                <div className="col-1">{this.calcPercent(s.growth)}%</div>
                <div className="col-1">
                  <input type="button" className="button red" value="Kick" />
                </div>
              </div>
            )
        }
      </div>
    )
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassStudents);