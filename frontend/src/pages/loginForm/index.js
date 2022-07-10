import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
=======
import ReCAPTCHA from "react-google-recaptcha";
>>>>>>> Stashed changes
import { validateLoginForm } from "../../services/validate";
function LoginForm({ setLoginUser }) {
  axios.defaults.withCredentials = true;

  // password toggle
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  // captcha verified yet ?
  const [isVerified, setIsVerified] = useState(false);
  const handleOnChangeCaptcha = (value) => {
    console.log("Captcha value: ", value);
    setIsVerified(true);
  };

  // formik
  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validateLoginForm,
<<<<<<< Updated upstream
      onSubmit: (email, password) => {
        axios
          .post(`${process.env.REACT_APP_BACKEND}/login`, {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            alert(res.data.message);
            setLoginUser(res.data.user);
          });
=======
      onSubmit: async (email, password) => {
        try {
          const res = await axios.post(
            "/auth/login",
            { email, password },
            { credentials: "include" }
          );
          localStorage.setItem("access_token", res.data.token);
          console.log("res", res);
        } catch (error) {
          alert("error");
        }
>>>>>>> Stashed changes
      },
    });
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='login-container'>
          <form className='login-form' onSubmit={handleSubmit}>
            <h1>log in to your account</h1>
            <div className='email-container'>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className='input-error'>{errors.email}</div>
              )}
            </div>{" "}
            <div className='password-container'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type={passwordType}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
          <span className='register'>
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
