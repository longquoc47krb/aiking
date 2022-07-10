const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const viewRouter = require("./routes/viewRouter");
const errorController = require("./controllers/errorController");
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(jwtSecret));

app.use("/", viewRouter);
app.use("/auth/", authRouter);

app.use(errorController);

module.exports = app;
