import { Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginForm() {
  const [passwordType, setPasswordType] = useState("password");
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
  const notify = () => toast("Wow so easy!");
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='login-container'>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(true);
              }, 500);
              toast("Logged in successfully!");
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Your email address is not correct")
                .required("This field is required"),
              password: Yup.string()
                .required("This field is required")
                .min(6, "Use from 6 characters")
                .matches(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
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
              console.log("isSubmitting:", isSubmitting);
              return (
                <form onSubmit={handleSubmit} className='login-form'>
                  <h1>log in to your account</h1>

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
                  !errors.password &&
                  !errors.email &&
                  isVerified ? (
                    <button
                      type='submit'
                      style={{ width: "100%" }}
                      disabled={false}>
                      Login
                    </button>
                  ) : (
                    <button
                      type='submit'
                      style={{ width: "100%" }}
                      disabled={true}>
                      Login
                    </button>
                  )}

                  <a>Forgot your password?</a>
                </form>
              );
            }}
          </Formik>
          <span className='register'>
            Don't have an account? <a>Register</a>
          </span>
          <div className='privacy'>
            <a>Privacy Notice</a>
            <a>Cookies Notice</a>
            <a>Cookies Settings</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
