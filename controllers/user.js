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

// If user.buzzes.length == 1 run function as normal
// If user.buzzes.length >= 2, run function with time elapsed included and
// Loop through buzzes based on buzz.length and run function for each

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

// Have to calculate based on current date/timestamp - add later
// Calculate all BAC's from latest buzz drink date/timestamp

router.get("/bac/:id", (req, res) => {
  User.findOne({ name: req.params.id }).then(user => {
    let total;
    let buzzDuration;
    let buzzHours;
    var durations = [];
    var totals = [];
    if (user.buzzes.length == 1) {
      total = getBAC(
        user.weight,
        user.gender,
        user.buzzes[0].numberOfDrinks,
        user.buzzes[0].drinkType,
        user.buzzes[0].hours
      );
    }
    if (user.buzzes.length >= 2) {
      console.log(user.buzzes.length);
      for (i = 0; i < user.buzzes.length - 1; i++) {
        var date2_ms = user.buzzes[
          user.buzzes.length - 1
        ].dateCreated.getTime();
        var date1_ms = user.buzzes[i].dateCreated.getTime();
        var diff_ms = date2_ms - date1_ms;
        diff_ms = diff_ms / 1000;
        var seconds = Math.floor(diff_ms % 60);
        diff_ms = diff_ms / 60;
        var minutes = Math.floor(diff_ms % 60);
        diff_ms = diff_ms / 60;
        var hours = Math.floor(diff_ms % 24);
        console.log(hours + " hours, " + minutes + " minutes");
        if (hours == 0) {
          buzzDuration = minutes / 60;
          console.log(minutes + ` duration loop ${i}`);
        } else {
          buzzDuration = hours + minutes / 60;
        }
        console.log(buzzDuration + ` duration loop ${i}`);
        durations.push(buzzDuration);
      }
      for (i = 0; i < user.buzzes.length; i++) {
        if (i == user.buzzes.length - 1) {
          buzzHours = 0;
        } else {
          buzzHours = durations[i];
        }
        buzzTotal = getBAC(
          user.weight,
          user.gender,
          user.buzzes[i].numberOfDrinks,
          user.buzzes[i].drinkType,
          buzzHours
        );
        console.log(buzzTotal + ` BAC loop ${i}`);
        totals.push(buzzTotal);
      }
      console.log(durations);
      console.log(totals);
      console.log(totals.reduce((a, b) => a + b, 0));
      total = totals.reduce((a, b) => a + b, 0);
    }
    console.log(total);
    user.bac = total;
    user.save((err, user) => {
      res.json(user);
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

router.post("/bac/:id/buzz", (req, res) => {
  console.log(req.body);
  var newBuzz = {
    numberOfDrinks: req.body.numberOfDrinks,
    drinkType: req.body.drinkType,
    hours: req.body.hours
  };
  User.findOneAndUpdate(
    { name: req.params.id },
    { $push: { buzzes: newBuzz } }
  ).then(user => {
    user.save((err, user) => {
      res.json(user);
    });
  });
});

module.exports = router;
