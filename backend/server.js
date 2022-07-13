const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connectDB } = require("./configs/database");
const { blue } = require("./configs/constants");
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

connectDB();
app.listen(port, () => {
  console.log(blue, `Server listening on ${port}`);
});
