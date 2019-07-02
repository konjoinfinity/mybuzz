const mongoose = require("./connection");
const User = require("../models/user");
const passport = require("passport");

mongoose.Promise = Promise;

User.deleteMany({})
  .then(() => {
    User.register(
      {
        username: "c.blundon@gmail.com",
        name: "Charles",
        gender: "Male",
        weight: 180,
        buzzes: [
          {
            numberOfDrinks: 1,
            drinkType: "Wine",
            hours: 1,
            dateCreated: Date.now()
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
      },
      "Test123",
      (err, user) => {
        if (err) {
          console.log(err);
        } else {
          console.log("User Created");
        }
      }
    );
  })
  .then(console.log("Users Deleted"));

// User.register({
//   username: "wesleyscholl@gmail.com",
//   password: "777bmx777",
//   name: "Wesley",
//   gender: "Male",
//   weight: 210,
//   oldbuzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1,
//       dateCreated: Date.now()
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1,
//       dateCreated: Date.now()
//     }
//   ]
// }).then(console.log("User Created"));

// User.register({
//   name: "Julie",
//   gender: "Female",
//   weight: 150,
//   username: "julie@julie.com",
//   password: "whywhywhy",
//   buzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1
//     }
//   ],
//   oldbuzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1,
//       dateCreated: Date.now()
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1,
//       dateCreated: Date.now()
//     }
//   ]
// }).then(console.log("User Created"));
//
// User.register({
//   name: "Brian",
//   gender: "Male",
//   weight: 190,
//   username: "brian@brian.com",
//   password: "hellohello",
//   buzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Liquor",
//       hours: 1
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Liquor",
//       hours: 1
//     }
//   ],
//   oldbuzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Liquor",
//       hours: 1,
//       dateCreated: Date.now()
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Liquor",
//       hours: 1,
//       dateCreated: Date.now()
//     }
//   ]
// }).then(console.log("User Created"));
//
// User.register({
//   name: "Tim",
//   gender: "Male",
//   weight: 210,
//   username: "tim@tim.com",
//   password: "byebyebye",
//   buzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Liquor",
//       hours: 1
//     }
//   ],
//   oldbuzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1,
//       dateCreated: Date.now()
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1,
//       dateCreated: Date.now()
//     }
//   ]
// }).then(console.log("User Created"));
//
// User.register({
//   name: "Kate",
//   gender: "Female",
//   weight: 140,
//   username: "kate@kate.com",
//   password: "sighsighsigh",
//   buzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1
//     }
//   ],
//   oldbuzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1,
//       dateCreated: Date.now()
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Beer",
//       hours: 1,
//       dateCreated: Date.now()
//     }
//   ]
// }).then(console.log("User Created"));
//
// User.register({
//   name: "James",
//   gender: "Male",
//   weight: 200,
//   username: "james@james.com",
//   password: "hihihi",
//   buzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1
//     }
//   ],
//   oldbuzzes: [
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1,
//       dateCreated: Date.now()
//     },
//     {
//       numberOfDrinks: 1,
//       drinkType: "Wine",
//       hours: 1,
//       dateCreated: Date.now()
//     }
//   ]
// }).then(console.log("User Created"));
