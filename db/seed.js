const mongoose = require("./connection");
const User = require("../models/user");

mongoose.Promise = Promise;

User.deleteMany({})
  .then(() => {
    User.create({
      name: "Charles",
      gender: "M",
      weight: 180,
      email: "c.blundon@gmail.com",
      password: "Test123",
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
  gender: "M",
  weight: 210,
  email: "wesleyscholl@gmail.com",
  password: "konjo1234",
  buzzes: [
    {
      numberOfDrinks: 4,
      drinkType: "Beer",
      hours: 2
    }
  ]
}).then(console.log("User Created"));
