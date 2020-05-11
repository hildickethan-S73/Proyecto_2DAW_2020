import React from 'react';
import { Link } from "react-router-dom";

const CreateClassButton = () => {
  return (
    <li className="header-nav-item"><Link to="/createclass"><input className="form-item button" type="button" value="Create Class" /></Link></li>
  );
};

export default CreateClassButton;