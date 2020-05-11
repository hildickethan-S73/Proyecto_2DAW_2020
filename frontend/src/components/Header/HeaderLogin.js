import React from 'react';
import { Link } from "react-router-dom";
import HeaderClass from './HeaderClass';

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