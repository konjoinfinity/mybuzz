const express = require("express");
const router = express.Router();
const mongoose = require("../db/connection");
const User = require("../models/user");

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
  return bac;
}

router.get("/", (req, res) => {
  User.find({}).then(users => res.render("index", { users }));
});

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", (req, res) => {
  if (req.body.password === req.body.confirmpassword) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      weight: req.body.weight,
      password: req.body.password
    })
      .then(user => {
        res.redirect(`/user/${user._id}`);
      })
      .catch(err => {
        console.log(err.message);
        res.redirect("/login");
      });
  } else {
    console.log("Passwords do not match.");
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user.password === req.body.password) {
        res.redirect(`/user/${user._id}`);
      } else {
        console.log("Password does not match account.");
        res.redirect("/login");
      }
    })
    .catch(err => {
      console.log(err.message);
      res.redirect("/login");
    });
});

router.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    let total;
    let buzzDuration;
    let buzzHours;
    var durations = [];
    var totals = [];
    if (user.buzzes.length >= 1) {
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
        if (hours == 0) {
          buzzDuration = minutes / 60;
        } else {
          buzzDuration = hours + minutes / 60;
        }
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
        totals.push(buzzTotal);
      }
      total = totals.reduce((a, b) => a + b, 0);
    }
    user.bac = total;
    user.save((err, user) => {
      res.render("user/show", { user });
    });
  });
});

router.post("/user/:id", (req, res) => {
  var newBuzz = {
    numberOfDrinks: 1,
    drinkType: req.body.drinkType,
    hours: 1
  };
  User.findOne({ _id: req.params.id }).then(user => {
    user.buzzes.push(newBuzz);
    user.save().then(user => {
      let total;
      let buzzDuration;
      let buzzHours;
      var durations = [];
      var totals = [];
      if (user.buzzes.length == 0) {
        total = getBAC(user.weight, user.gender, 1, req.body.drinkType, 1);
      }
      if (user.buzzes.length >= 1) {
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
          if (hours == 0) {
            buzzDuration = minutes / 60;
          } else {
            buzzDuration = hours + minutes / 60;
          }
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
          totals.push(buzzTotal);
        }
        total = totals.reduce((a, b) => a + b, 0);
      }
      user.bac = total;
      user.save((err, user) => {
        res.render("user/show", { user });
      });
    });
  });
});

router.get("/user/:id/bac", (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.render("user/show", { user });
  });
});

router.put("/user/:id/del", (req, res) => {
  const buzzId = { _id: req.body.index };
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { buzzes: buzzId } }
  ).then(user => {
    user.save((err, user) => {
      res.redirect("back");
    });
  });
});

module.exports = router;
