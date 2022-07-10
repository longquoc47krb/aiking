const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connectDB } = require("./configs/database");
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

connectDB();
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
