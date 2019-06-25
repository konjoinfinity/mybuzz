const mongoose = require("./connection");
const User = require("../models/user");

mongoose.Promise = Promise;

// add date for buzzes and user created
User.deleteMany({})
  .then(() => {
    User.create({
      name: "Charles",
      gender: "Male",
      weight: 180,
      email: "c.blundon@gmail.com",
      password: "Test123",
      bac: 0,
      buzzes: [
        {
          numberOfDrinks: 2,
          drinkType: "Beer",
          hours: 1
        }
      ]
    }).then(console.log("User Created"));
  })
  .then(console.log("Users Deleted"));

User.create({
  name: "Wesley",
  gender: "Male",
  weight: 210,
  email: "wesleyscholl@gmail.com",
  password: "777bmx777",
  bac: 0,
  buzzes: [
    {
      numberOfDrinks: 4,
      drinkType: "Beer",
      hours: 2
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Julie",
  gender: "Female",
  weight: 150,
  email: "julie@julie.com",
  password: "whywhywhy",
  bac: 0,
  buzzes: [
    {
      numberOfDrinks: 5,
      drinkType: "Liquor",
      hours: 3
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Brian",
  gender: "Male",
  weight: 190,
  email: "brian@brian.com",
  password: "hellohello",
  bac: 0,
  buzzes: [
    {
      numberOfDrinks: 6,
      drinkType: "Liquor",
      hours: 4
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Tim",
  gender: "Male",
  weight: 210,
  email: "tim@tim.com",
  password: "byebyebye",
  bac: 0,
  buzzes: [
    {
      numberOfDrinks: 2,
      drinkType: "Liquor",
      hours: 1
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Kate",
  gender: "Female",
  weight: 140,
  email: "kate@kate.com",
  password: "sighsighsigh",
  bac: 0,
  buzzes: [
    {
      numberOfDrinks: 3,
      drinkType: "Beer",
      hours: 1
    }
  ]
}).then(console.log("User Created"));
