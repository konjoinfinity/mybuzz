const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

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
  username: String,
  gender: String,
  weight: Number,
  bac: {
    type: Number,
    default: 0.0
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  buzzes: [Buzz],
  oldbuzzes: [Buzz],
  timeSince: String,
  holdTime: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
