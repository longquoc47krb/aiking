const mongoose = require("mongoose");
const { blue } = require("./constants");

//Thuc hien bat dong bo trong qua trinh ket noi DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      //Tranh viec in ra canh bao
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(blue, `MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
