const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
      console.log("MongoDB Databse Connected");
    })
    .catch((err) => console.log(err));
};

module.exports = mongoDB;
