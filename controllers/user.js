const express = require("express");
const router = express.Router();
const mongoose = require("../db/connection");
const User = require("../models/user");

// Widmark formula
// BAC = (0.806 * SD * 1.2)/(BW * Wt)-(MR * DP)
//
// 0.806 is a constant for body water in the blood (mean 80.6%),
// SD is the number of standard drinks, that being 10 grams of ethanol each,
// 1.2 is a factor to convert the amount in grams to Swedish standards set by
// The Swedish National Institute of Public Health,
// BW is a body water constant (0.58 for males and 0.49 for females),
// Wt is body weight (kilogram),
// MR is the metabolism constant (0.015 for males and 0.017 for females) and
// DP is the drinking period in hours.[2]
// 10 converts the result to permillage of alcohol

// Time is a variable - ideally a chron job that runs every minute to
// update the BAC, for now we could ask how long ago did you have the drink

function getBAC(weight, gender, drinks, drinkType, hours) {
  var distribution;
  if (gender == "Female") {
    distribution = 0.66;
  }
  if (gender == "Male") {
    distribution = 0.73;
  }
  var totalAlc;
  if (drinkType == "Beer") {
    totalAlc = 12 * drinks * 0.05;
  }
  if (drinkType == "Wine") {
    totalAlc = 5 * drinks * 0.12;
  }
  if (drinkType == "Liquor") {
    totalAlc = 1.5 * drinks * 0.4;
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
      // The user object is sent back to the browser in json format
    });
  });
});

router.post("/bac/total", (req, res) => {
  console.log(req.body);
  var total = getBAC(
    req.body.weight,
    req.body.gender,
    req.body.numberOfDrinks,
    req.body.drinkType,
    req.body.hours
  );
  console.log(total);
  bactotal = parseFloat(total.toFixed(4));
  res.json(bactotal);
});

module.exports = router;
