import React from "react";
import logo from "./../../assets/logo.png";
function Header() {
  return (
    <div className='header'>
      <div className='header-container'>
        <img src={logo} />
      </div>
    </div>
  );
}

export default Header;
