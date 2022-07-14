/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, reset } from "../../services/authSlice";
import logo from "./../../assets/logo.png";
import { ImExit } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Header({ isAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success("Successfully logout", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
              <span href=''>{user.username}</span>
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
                  <Link to='/login' className='login-button-link'>
                    <button className='login-button'>Login</button>
                  </Link>
                  <div className='toggle-menu'>
                    <GiHamburgerMenu />
                  </div>
                </>
              )}
            </>
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Header;
