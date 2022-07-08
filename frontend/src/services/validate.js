import * as Yup from "yup";

const validateLoginForm = Yup.object().shape({
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
});
const validateRegisterForm = Yup.object().shape({
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
});

export { validateLoginForm, validateRegisterForm };
