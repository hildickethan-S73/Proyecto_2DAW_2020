import React from 'react';
import { Link } from "react-router-dom";

const HeaderNoLogin = () => {
  return (
    <header className="App-header">
      <div className="filler"></div>
      <div>
        <nav className="header-nav">
          <ul>
            <li className="header-nav-item"><Link to="/settings" title="Settings">Settings</Link></li>
            <li className="header-nav-item"><Link to="/register" className="active" title="Login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderNoLogin;