const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Buzz = new Schema({
  numberOfDrinks: Number,
  drinkType: String,
  hours: Number
});

const User = new Schema({
  name: String,
  gender: String,
  weight: Number,
  email: String,
  password: String,
  bac: Number,
  buzzes: [Buzz]
});

module.exports = mongoose.model("User", User);
