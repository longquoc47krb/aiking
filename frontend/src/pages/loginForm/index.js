import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ReCAPTCHA from "react-google-recaptcha";
import { validateLoginForm } from "../../services/validate";
function LoginForm({ setLoginUser }) {
  axios.defaults.withCredentials = true;
  // reload
  const [reload, setReload] = useState(false);
  // password toggle
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  // reload captcha
  useEffect(() => {
    const refreshCaptcha = () => {
      setReload(!reload);
    };
    refreshCaptcha();
  }, []);

  // captcha verified yet ?
  const [isVerified, setIsVerified] = useState(false);
  const handleOnChangeCaptcha = (value) => {
    console.log("Captcha value: ", value);
    setIsVerified(true);
  };

  const { loginUser, error } = useAuth();

  // formik
  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validateLoginForm,
      onSubmit: async (email, password) => {
        await loginUser(values);
      },
    });
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='login-container'>
          <form className='form' onSubmit={handleSubmit}>
            <h1>log in to your account</h1>
            <div className='input-container'>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className='error-message'>{errors.email}</div>
              )}
            </div>{" "}
            <div className='input-container password'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type={passwordType}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
            !errors.password &&
            !errors.email &&
            isVerified ? (
              <button type='submit' style={{ width: "100%" }} disabled={false}>
                Login
              </button>
            ) : (
              <button type='submit' style={{ width: "100%" }} disabled>
                Login
              </button>
            )}
            <a>Forgot your password?</a>
          </form>
          <span className='register-link'>
            Don't have an account?{" "}
            <a>
              <Link to='/signup'>Register</Link>
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
export default LoginForm;
