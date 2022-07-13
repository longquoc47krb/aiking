const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const { errorHandler } = require("./middlewares/errorMiddlewares");
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(morgan("tiny"));

// Initialize middleware
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(jwtSecret));

app.use("/api/users", require("./routes/authRouter"));
// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
app.use(errorHandler);

module.exports = app;
