const mongoose = require("./connection");
const User = require("../models/user");
const passport = require("passport");

mongoose.Promise = Promise;

User.deleteMany({}).then(() => {
  console.log("Users Deleted");
});

setTimeout(() => {
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

  User.register(
    {
      username: "wesleyscholl@gmail.com",
      name: "Wesley",
      gender: "Male",
      weight: 210,
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
    "777bmx777",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );

  User.register(
    {
      username: "julie@julie.com",
      name: "Julie",
      gender: "Female",
      weight: 150,
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
    },
    "whywhywhy",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );

  User.register(
    {
      username: "brian@brian.com",
      name: "Brian",
      gender: "Male",
      weight: 190,
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
    },
    "hellohello",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );

  User.register(
    {
      username: "tim@tim.com",
      name: "Tim",
      gender: "Male",
      weight: 210,
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
    },
    "byebyebye",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );

  User.register(
    {
      username: "kate@kate.com",
      name: "Kate",
      gender: "Female",
      weight: 140,

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
    },
    "sighsighsigh",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );

  User.register(
    {
      username: "james@james.com",
      name: "James",
      gender: "Male",
      weight: 200,
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
    },
    "hihihi",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );

  User.register(
    {
      username: "konjo@konjo.com",
      name: "Konjo",
      gender: "Male",
      weight: 200,
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
    },
    "konjokonjo",
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Created");
      }
    }
  );
}, 3000);
