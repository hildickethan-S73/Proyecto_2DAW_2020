import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import agent from '../../agent';
import ClassHome from './Components/ClassHome';
import ClassStudents from './Components/ClassStudents';
import ClassRewards from './Components/ClassRewards';
import ClassShop from './Components/ClassShop';
import ClassGroups from './Components/ClassGroups';
import ClassSettings from './Components/ClassSettings';
import { CLASS_GET_CURRENT, CLASS_GET_STUDENTS, CLASS_SEARCH_STUDENT, STUDENT_UPDATE_ACTIVE } from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  auth: state.auth,
  classes: state.classes
})

const mapDispatchToProps = (dispatch) => ({
  loadClass: (id) => dispatch({
    type: CLASS_GET_CURRENT,
    payload: id
  }),
  loadStudents: (returnedstudents) => dispatch({
    type: CLASS_GET_STUDENTS,
    payload: returnedstudents
  }),
  searchStudent: (newChange) => dispatch({
    type: CLASS_SEARCH_STUDENT,
    payload: newChange
  }),
  updateActiveStudent: (newStudent) => dispatch({
    type: STUDENT_UPDATE_ACTIVE,
    payload: newStudent
  }),
})

class Class extends Component {
  constructor(props){
    super(props);
    const id = this.props.match.params.id;
    this.load(id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const id = nextProps.match.params.id;
      this.load(id);
    }
  }

  load(id) {
    Promise.resolve(
      agent.API.getCurrentClass(id)
    ).then(res => {
      this.props.loadClass(res);
      this.props.loadStudents(Promise.resolve(
        agent.API.getStudents({"student_ids":res[0].student_ids})
      ))
    })
  }

  search = (event) => {
    const target  = event.target;
    this.props.searchStudent({
        target: target
    });
  }

  changeActive(id) {
    this.props.updateActiveStudent(id);
  }

  renderStudent(s) {
    return (
      <div key={s.id} className="student-list-name">
        <a className={"pointer "+
            (this.props.classes.activeStudent.id === s.id && "active") // adds active if this is activeStudent
          } 
          onClick={() => this.changeActive(s.id)
        }>
          {s.name}
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className="App-body">
        <div className="row height95">
          <div className="col-2 flex flex-column">
            <div className="search-bar">
              <input type="text" placeholder="student search" onChange={this.search}/>
            </div>
            <div className="student-list flex flex-column">
              {/* bruh */}
              {/* search is empty at start so use full students list instead */}
              { this.props.classes.search 
                ? this.props.classes.search.map((s,i) => this.renderStudent(s))
                : this.props.classes.students
                  && this.props.classes.students.map((s,i) => this.renderStudent(s))
              }
            </div>
          </div>
          <div className="col-10 padding-0">
            <Switch>
              <Route exact path="/class/:id/home" component={ClassHome}/>
              <Route exact path="/class/:id/students" component={ClassStudents}/>
              <Route exact path="/class/:id/rewards" component={ClassRewards}/>
              <Route exact path="/class/:id/shop" component={ClassShop}/>
              <Route exact path="/class/:id/groups" component={ClassGroups}/>
              <Route exact path="/class/:id/settings" component={ClassSettings}/>
              <Redirect from="/class/:id/*" to="/class/:id/home" />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Class);