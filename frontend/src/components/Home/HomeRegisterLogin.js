import React from 'react';

const HomeRegisterLogin = (props) => {
  return (
    <div className="login-box">
      <h3>Register</h3>
      <form>
        <input className="form-item" placeholder="username" type="text"/>
        <input className="form-item" placeholder="email" type="email"/>
        <input className="form-item" placeholder="password" type="password"/>
        <input className="form-item" placeholder="confirm password" type="password"/>
        <input className="form-item login-button" type="button" value="Register" />
      </form>
    </div>
  );
};

export default HomeRegisterLogin;