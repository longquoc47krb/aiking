/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, reset } from "../../services/authSlice";
import logo from "./../../assets/logo.png";
import { ImExit } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
function Header({ isAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  // useLocation to get route path
  const location = useLocation();
  return (
    <div className='header'>
      <div className='header-container'>
        <div className='header-logo'>
          <Link to='/'>
            <img src={logo} href='/' />
          </Link>
        </div>
        <ul className='header-auth'>
          {user ? (
            <li className='username'>
              <span href=''>Welcome, {user.username}</span>
              <div className='logout' onClick={onLogout}>
                <ImExit />
              </div>
            </li>
          ) : (
            <>
              {location.pathname == "/login" ? (
                ""
              ) : (
                <>
                  <button className='login-button'>
                    <Link to='/login'>Login</Link>
                  </button>
                  <div className='toggle-menu'>
                    <GiHamburgerMenu />
                  </div>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
