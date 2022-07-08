const express = require("express");

//Add login, register
const {
  login,
  register,
  getCurrentUser,
} = require("../controllers/authController");
const { checkCurrentUser } = require("../middlewares/checkCurrenUser");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Router;
