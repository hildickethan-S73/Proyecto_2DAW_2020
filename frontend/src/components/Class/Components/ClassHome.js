import React, { Component } from 'react';
import { connect } from "react-redux";
import agent from '../../../agent';
import { STUDENT_UPDATE_GROWTH } from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  classes: state.classes,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  updateGrowth: (newStudent) => dispatch({
    type: STUDENT_UPDATE_GROWTH,
    payload: newStudent
  }),
})

class ClassHome extends Component {
  changeGrowth(number) {
    const student = this.props.classes.activeStudent;
    
    const params = {
      "id": student.id,
      "growth": number
    }
    this.props.updateGrowth(Promise.resolve(
      agent.API.updateGrowth(params)
    ));
  }

  render() {
    if (this.props.classes.students && this.props.classes.students.length > 0) {
      let name = this.props.classes.activeStudent.name;
      let growth = this.props.classes.activeStudent.growth;
      let energy = this.props.classes.activeStudent.energy;
      let currency = this.props.classes.activeStudent.currency;
      let level = Math.floor(growth/100)+1;
      let growthToLevel = (Math.floor(growth/100)*100)+100;
      let normalizedGrowth = (growth-(growthToLevel-100));
      let normalizedGrowthToLevel = (Math.floor(normalizedGrowth/100)*100)+100;
      // 0-10 for bootstrap
      let growthBarCalc = Math.floor((normalizedGrowth/normalizedGrowthToLevel)*10)
      let energyBarCalc = Math.floor(energy/10)

      return (
        <div className="row height95">
          <div className="col-4 student-info">
            <div className="student-info-name">
              <h1>{name}</h1>
              {/* <div>species</div> */}
              <div>Level {level}</div>
            </div>
            <div className="student-info-bars">
              <div className="row">
                <div className="col-2 bar-name">
                  <div>Energy</div>
                  <div><span>{energy}</span>/100</div>
                </div>
                <div className={"bar energy col-"+energyBarCalc}></div>
              </div>
              <div className="row">
                <div className="col-2 bar-name">
                  <div>Growth</div>
                  <div><span>{growth}</span>/{growthToLevel}</div>
                </div>
                <div className={"bar growth col-"+growthBarCalc}></div>
              </div>
              <div className="row">
                <div className="col-2 bar-name">
                  <div>Coins</div>
                  <div><span>{currency}</span></div>
                </div>
                <div className="col-10 bar coins"></div>
              </div>
            </div>
            { this.props.auth.user.admin_id &&
              <div className="student-info-buttons">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-2 circle growth" onClick={() => this.changeGrowth(20)}><span className="center">+ growth</span></div>
                  <div className="col-1"></div>
                  <div className="col-2 circle red" onClick={() => this.changeGrowth(-20)}><span className="center">- growth</span></div>
                  <div className="col-1"></div>
                  <div className="col-2 circle cyan"><span className="center">-/+ custom</span></div>
                  <div className="col-1"></div>
                </div>
              </div>
            }
            <div className="student-info-skills">
              <div className="row">
                <div className="col-3 flex flex-column">
                  <div className="filler"></div>
                  <img className="skill-img" src="https://api.adorable.io/avatars/95/skill1" alt="skill" />
                  <div className="filler"></div>
                </div>
                <div className="col-9 skill-text">
                  <div className="skill-name">
                    <b>skill name</b>
                  </div>
                  <div className="skill-desc">
                    skill desc
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3 flex flex-column">
                  <div className="filler"></div>
                  <img className="skill-img" src="https://api.adorable.io/avatars/95/skill2" alt="skill" />
                  <div className="filler"></div>
                </div>
                <div className="col-9 skill-text">
                  <div className="skill-name">
                    <b>skill name</b>
                  </div>
                  <div className="skill-desc">
                    skill desc
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3 flex flex-column">
                  <div className="filler"></div>
                  <img className="skill-img" src="https://api.adorable.io/avatars/95/skill3" alt="skill" />
                  <div className="filler"></div>
                </div>
                <div className="col-9 skill-text">
                  <div className="skill-name">
                    <b>skill name</b>
                  </div>
                  <div className="skill-desc">
                    skill desc
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 flex flex-column">
            <div className="filler"></div>
            <div className="row">
              <div className="col-6 group-player padding-0">
                <img src="https://api.adorable.io/avatars/112/player1" alt="player 1" />
              </div>
              <div className="col-6 group-player padding-0">
                <img src="https://api.adorable.io/avatars/112/player2" alt="player 2" />
              </div>
            </div>
          </div>
          <div className="col-4 flex flex-column">
            <div className="filler"></div>
            <div className="student-character">
              <img src={"https://api.adorable.io/avatars/285/"+this.props.classes.activeStudent.name} alt="student character" />
            </div>
            <div className="filler"></div>
          </div>
          <div className="col-2 flex flex-column">
            <div className="filler"></div>
            <div className="row">
              <div className="col-6 group-player padding-0">
                <img src="https://api.adorable.io/avatars/112/player3" alt="player 3" />
              </div>
              <div className="col-6 group-player padding-0">
                <img src="https://api.adorable.io/avatars/112/player4" alt="player 4" />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="height95">
          <h1>No students</h1>
        </div>
      )
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassHome);