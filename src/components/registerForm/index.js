import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toastPromise from "../../services/toast";
import { term } from "../../common/constants";
import { Link } from "react-router-dom";
import axios from "axios";
function RegisterForm() {
  const [passwordType, setPasswordType] = useState("password");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const [isVerified, setIsVerified] = useState(false);
  const handleOnChange = (value) => {
    console.log("Captcha value: ", value);
    setIsVerified(true);
  };
  const submit = (e) => {
    console.log(user.username);
    e.preventDefault();
    const register = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    axios
      .post("http://localhost:4000/api/signup", register)
      .then((res) => console.log(res.data))
      .then((data) => {
        alert("SignUp SuccessFully");
      })
      .catch(() => {
        console.log("Errorrrrrrr");
      });
  };
  return (
    <div className='signup'>
      <div className='signup-wrapper'>
        <div className='signup-container'>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("This field is required")
                .min(6, "Use from 6 characters"),
              email: Yup.string()
                .email("Your email address is not correct")
                .required("This field is required"),
              password: Yup.string()
                .required("This field is required")
                .min(6, "Use from 6 characters")
                .matches(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{6,}$/,
                  "Your password must have at least: 1 Lowercase, 1 Uppercase, and Digits"
                ),
            })}>
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={submit} className='signup-form'>
                  <h1>Register</h1>

                  <div className='username-container'>
                    <label htmlFor='username'>Username</label>
                    <input
                      name='username'
                      type='text'
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.username && touched.username && "error"}
                    />
                    {console.log("errors.username =", errors.username)}
                    {errors.username && touched.username && (
                      <div className='input-error'>{errors.username}</div>
                    )}
                  </div>
                  <div className='email-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                      name='email'
                      type='text'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                      <div className='input-error'>{errors.email}</div>
                    )}
                  </div>

                  <div className='password-container'>
                    <label htmlFor='password'>Password</label>
                    <input
                      name='password'
                      type={passwordType}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                    />
                    <a className='eye' onClick={togglePassword}>
                      {passwordType === "password" ? (
                        <AiOutlineEyeInvisible style={{ color: "black" }} />
                      ) : (
                        <AiOutlineEye style={{ color: "black" }} />
                      )}
                    </a>
                    {errors.password && touched.password && (
                      <div className='input-error'>{errors.password}</div>
                    )}
                  </div>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    onChange={handleOnChange}
                  />
                  {values.email &&
                  values.password &&
                  values.username &&
                  !errors.password &&
                  !errors.email &&
                  !errors.username &&
                  isVerified ? (
                    <button
                      type='submit'
                      style={{ width: "100%" }}
                      disabled={false}>
                      Register
                    </button>
                  ) : (
                    <button type='submit' style={{ width: "100%" }} disabled>
                      Register
                    </button>
                  )}
                  <p className='term'>{term}</p>
                </form>
              );
            }}
          </Formik>
          <span className='login'>
            Already have an account?{" "}
            <a>
              <Link to='/login'>Login</Link>
            </a>
          </span>
          <div className='privacy'>
            <a>Privacy Notice</a>
            <a>Cookies Notice</a>
            <a>Cookies Settings</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
