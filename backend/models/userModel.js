const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
var validate = require("mongoose-validator"); // Import Mongoose Validator Plugin
const Schema = mongoose.Schema;

// Password Validator
var passwordValidator = [
  validate({
    validator: "matches",
    arguments: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{6,}$/,
    message:
      "Your password must have at least: 1 Lowercase, 1 Uppercase, and Digits",
  }),
];
// User E-mail Validator
var emailValidator = [
  validate({
    validator: "matches",
    arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
    message:
      "Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.",
  }),
  validate({
    validator: "isLength",
    arguments: [3, 40],
    message: "Email should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a username."],
    unique: [true, "That username is taken."],
    lowercase: true,
    validate: [
      validator.isAlphanumeric,
      "Usernames may only have letters and numbers.",
    ],
  },
  email: {
    type: String,
    require: [true, "Enter an email address."],
    unique: [true, "That email address is taken."],
    lowercase: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, "Enter a password."],
    minLength: [6, "Password should be at least six characters"],
    validate: passwordValidator,
  },
});

//schema middleware to apply before saving
userSchema.pre("save", async function (next) {
  //hash the password, set hash cost to 12
  this.password = await bcrypt.hash(this.password, 12);
});

//check password at login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
