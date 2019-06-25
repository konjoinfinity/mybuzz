const express = require("express");
const router = express.Router();
const mongoose = require("../db/connection");
const User = require("../models/user");

// Declaring the BAC function up top for usage down below
function getBAC(weight, gender, drinks, drinkType, hours) {
  var distribution;
  if (gender == "Female") {
    distribution = 0.66;
  } else {
    distribution = 0.73;
  }
  var totalAlc;
  if (drinkType == "beer") {
    totalAlc = 8 * drinks * 0.04;
  } else {
    totalAlc = 4 * drinks * 0.32;
  }
  var bac = (totalAlc * 5.14) / (weight * distribution) - 0.015 * hours;
  console.log(bac);
  return bac;
}

router.get("/", (req, res) => {
  User.find({}).then(users => res.json(users));
});

// To test the function within a route, added the /:id - req.params.id = user's name (case sensitive)
// Once the request is received at the localhost:5000/bac/username route ex. http://localhost:5000/bac/Tim
router.get("/bac/:id", (req, res) => {
  User.findOne({ name: req.params.id }).then(user => {
    // The weight, gender, numberOfDrinks, drinkType, and hours for buzzes[0] are passed
    // as arguments to the getBAC function and set the return value to variable total
    // We have to specifiy which index in the array of buzzes i.e. [0] [1] [2] etc.
    var total = getBAC(
      user.weight,
      user.gender,
      user.buzzes[0].numberOfDrinks,
      user.buzzes[0].drinkType,
      user.buzzes[0].hours
    );
    console.log(total);
    user.bac = parseFloat(total.toFixed(4));
    // this sets the bac property of the user object to the total
    // To reduce the number of decimal points (0.14166862361382912) use toFixed(number)
    // the number will be the number of decimal points in string format "0.1417"
    // to convert back to a number, we use parse float for decimals - output 0.1417
    user.save((err, user) => {
      // the user object is saved in the database
      res.json(user);
    });
  });
});

module.exports = router;
