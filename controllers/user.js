const express = require("express");
const router = express.Router();
const mongoose = require("../db/connection");
const User = require("../models/user");

function getBAC(weight, gender, drinks, drinkType, hours) {
  var distribution;
  if (gender == "F") {
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

router.get("/bac", (req, res) => {
  User.findOne({ name: "Charles" }).then(user => {
    var total = getBAC(
      user.weight,
      user.gender,
      user.buzzes[0].numberOfDrinks,
      user.buzzes[0].drinkType,
      user.buzzes[0].hours
    );
    console.log(total);
    res.json(total);
  });
});

module.exports = router;
