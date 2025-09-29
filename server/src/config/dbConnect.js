const mongoose = require("mongoose");
const { mongodb_url } = require("../secret");

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(mongodb_url, option);
    console.log("MongoBD is Connected with EcommerceMernDB");

    mongoose.connection.on("error", (error) => {
      console.log("DB connection error : ", error);
    });
  } catch (error) {
    console.log("Could not Connect to DB : ", error.toString());
  }
};

module.exports = connectDB;
