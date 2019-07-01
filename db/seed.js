const mongoose = require("./connection");
const User = require("../models/user");

mongoose.Promise = Promise;

User.deleteMany({})
  .then(() => {
    User.create({
      name: "Charles",
      gender: "Male",
      weight: 180,
      email: "c.blundon@gmail.com",
      password: "Test123",
      buzzes: [
        {
          numberOfDrinks: 1,
          drinkType: "Beer",
          hours: 1
        }
      ],
      oldbuzzes: [
        {
          numberOfDrinks: 1,
          drinkType: "Beer",
          hours: 1,
          dateCreated: Date.now()
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
  oldbuzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1,
      dateCreated: Date.now()
    },
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1,
      dateCreated: Date.now()
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Julie",
  gender: "Female",
  weight: 150,
  email: "julie@julie.com",
  password: "whywhywhy",
  buzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1
    }
  ],
  oldbuzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1,
      dateCreated: Date.now()
    },
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1,
      dateCreated: Date.now()
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Brian",
  gender: "Male",
  weight: 190,
  email: "brian@brian.com",
  password: "hellohello",
  buzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Liquor",
      hours: 1
    },
    {
      numberOfDrinks: 1,
      drinkType: "Liquor",
      hours: 1
    }
  ],
  oldbuzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Liquor",
      hours: 1,
      dateCreated: Date.now()
    },
    {
      numberOfDrinks: 1,
      drinkType: "Liquor",
      hours: 1,
      dateCreated: Date.now()
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Tim",
  gender: "Male",
  weight: 210,
  email: "tim@tim.com",
  password: "byebyebye",
  buzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Liquor",
      hours: 1
    }
  ],
  oldbuzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1,
      dateCreated: Date.now()
    },
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1,
      dateCreated: Date.now()
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "Kate",
  gender: "Female",
  weight: 140,
  email: "kate@kate.com",
  password: "sighsighsigh",
  buzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1
    },
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1
    },
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1
    }
  ],
  oldbuzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1,
      dateCreated: Date.now()
    },
    {
      numberOfDrinks: 1,
      drinkType: "Beer",
      hours: 1,
      dateCreated: Date.now()
    }
  ]
}).then(console.log("User Created"));

User.create({
  name: "James",
  gender: "Male",
  weight: 200,
  email: "james@james.com",
  password: "hihihi",
  buzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1
    }
  ],
  oldbuzzes: [
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1,
      dateCreated: Date.now()
    },
    {
      numberOfDrinks: 1,
      drinkType: "Wine",
      hours: 1,
      dateCreated: Date.now()
    }
  ]
}).then(console.log("User Created"));
