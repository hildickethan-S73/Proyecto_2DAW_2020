import React from 'react';
import { Link } from "react-router-dom";
import HeaderClass from './HeaderClass';
import CreateClassButton from '../../CreateClass/CreateClassButton';

const HeaderLogin = (props) => {
  return (
    <header className="App-header">
      <div>
        <nav className="header-nav">
          <ul>
            <li className="header-nav-item header-nav-dropdown"><a>Classes</a>
              <HeaderClass />
            </li>
            <li className="header-nav-item"><Link to="/chat" title="Chat">Chat</Link></li>
            {/* only teachers have an admin_id field */}
            {props.admin_id !== "" && <CreateClassButton />}
          </ul>
        </nav>
      </div>
      <div className="filler"></div>
      <div>
        <nav className="header-nav">
          <ul>
            <li className="header-nav-item"><Link to="/settings" title="Settings">Settings</Link></li>
            <li className="header-nav-item"><a className="active" onClick={props.logout} title="Profile">{props.name}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderLogin;