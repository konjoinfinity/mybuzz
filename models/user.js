const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

// add date for buzzes and user created
const Buzz = new Schema({
  numberOfDrinks: Number,
  drinkType: String,
  hours: Number,
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

const User = new Schema({
  name: String,
  gender: String,
  weight: Number,
  email: String,
  password: String,
  bac: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  buzzes: [Buzz]
});

module.exports = mongoose.model("User", User);
