import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { term } from "../../common/constants";
import { validateRegisterForm } from "../../services/validate";
function RegisterForm(props) {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const [isVerified, setIsVerified] = useState(false);
  const handleOnChangeCaptcha = (value) => {
    console.log("Captcha value: ", value);
    setIsVerified(true);
  };
  // formik
  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: validateRegisterForm,
      onSubmit: (username, email, password) => {
        axios
          .post(`${process.env.REACT_APP_BACKEND}/register`, {
            username: values.username,
            email: values.email,
            password: values.password,
          })
          .then((response) => {
            if (!response.data === false) {
              props.setLoggedInUser(response.data[0]);
              props.setLoggedIn(true);
              alert("You have successfully signup!");
            } else {
              props.handleNotificationsDanger(response.data);
            }
          });
      },
    });
  return (
    <div className='signup'>
      <div className='signup-wrapper'>
        <div className='signup-container'>
          <form onSubmit={handleSubmit} className='signup-form'>
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
              onChange={handleOnChangeCaptcha}
            />
            {values.email &&
            values.password &&
            values.username &&
            !errors.password &&
            !errors.email &&
            !errors.username &&
            isVerified ? (
              <button type='submit' style={{ width: "100%" }} disabled={false}>
                Register
              </button>
            ) : (
              <button type='submit' style={{ width: "100%" }} disabled>
                Register
              </button>
            )}
            <p className='term'>{term}</p>
          </form>
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
