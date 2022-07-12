/* eslint-disable jsx-a11y/anchor-is-valid */
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
      onSubmit: async (username, email, password) => {
        try {
          const res = await axios.post("/auth/register", {
            username,
            email,
            password,
          });
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } catch (error) {
          console.log("error", error.response);
        }
      },
    });
  return (
    <div className='signup'>
      <div className='signup-wrapper'>
        <div className='signup-container'>
          <form onSubmit={handleSubmit} className='form'>
            <h1>Register</h1>

            <div className='input-container'>
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
                <div className='error-message'>{errors.username}</div>
              )}
            </div>
            <div className='input-container'>
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
                <div className='error-message'>{errors.email}</div>
              )}
            </div>

            <div className='input-container password'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type={passwordType}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password && "error"}
              />
              <a className='eye-toggle' onClick={togglePassword}>
                {passwordType === "password" ? (
                  <AiOutlineEyeInvisible style={{ color: "black" }} />
                ) : (
                  <AiOutlineEye style={{ color: "black" }} />
                )}
              </a>
              {errors.password && touched.password && (
                <div className='error-message'>{errors.password}</div>
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
          <span className='login-link'>
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
