// const express = require("express");
// const router = express.Router();
// const mongoose = require("../db/connection");
// const User = require("../models/user");
//
// router.get("/", (req, res) => {
//   User.find({}).then(users => res.json(users));
// });

// function getBAC(weight, gender, drinks, drinkType, hours) {
//   var distribution;
//   if (gender == "F") {
//     distribution = 0.66;
//   } else {
//     distribution = 0.73;
//   }
//   var totalAlc;
//
//   if (drinkType == "beer") {
//     totalAlc = 8 * drinks * 0.04;
//   } else {
//     totalAlc = 4 * drinks * 0.32;
//   }
//   var BAC = (totalAlc * 5.14) / (weight * distribution) - 0.015 * hours;
//
//   return BAC;
// }
