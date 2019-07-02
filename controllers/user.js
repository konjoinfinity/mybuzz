const express = require("express");
const router = express.Router();
const mongoose = require("../db/connection");
const User = require("../models/user");
const passport = require("passport");
const authenticatedUser = require("../auth/authuser");

function getDayHourMin(date1, date2) {
  var dateDiff = date2 - date1;
  dateDiff = dateDiff / 1000;
  var seconds = Math.floor(dateDiff % 60);
  dateDiff = dateDiff / 60;
  var minutes = Math.floor(dateDiff % 60);
  dateDiff = dateDiff / 60;
  var hours = Math.floor(dateDiff % 24);
  var days = Math.floor(dateDiff / 24);
  console.log(days + " days " + hours + " hours " + minutes + " minutes");
  return [days, hours, minutes];
}

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

router.get("/", authenticatedUser, (req, res) => {
  console.log("slash route");
  User.find({}).then(users => res.render("index", { users }));
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/signup", (req, res) => {
  res.render("user/signup", { error: req.flash("error") });
});

router.post("/signup", (req, res) => {
  if (req.body.password === req.body.confirmpassword) {
    User.register(
      {
        name: req.body.name,
        username: req.body.username,
        gender: req.body.gender,
        weight: req.body.weight
      },
      req.body.password
    )
      .then(user => {
        const authenticate = passport.authenticate("local");
        authenticate(req, res, function() {
          req.flash("success", "You Successfully Logged In");
          res.redirect(`/user/${user._id}`);
        });
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/user/signup");
      });
  } else {
    req.flash("error", "Passwords do not match.");
    res.redirect("/user/signup");
  }
});

router.get("/login", (req, res) => {
  console.log("login route");
  res.render("user/login", {
    error: req.flash("error"),
    info: req.flash("info")
  });
});

router.post("/login", (req, res, next) => {
  var success = "You Logged In";
  const authenticate = passport.authenticate("local", function(
    err,
    user,
    info
  ) {
    if (err || !user) {
      console.log("auth error or no user");
      req.flash("error", info.message);
      res.redirect("/user/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log("login error");
        req.flash("error", err.message);
        return res.redirect("/user/login");
      }
      console.log(success);
      req.flash("success", "You Successfully Logged In");
      return res.redirect(`/user/${user._id}`);
    });
  });
  authenticate(req, res, next);
});

router.get("/logout", authenticatedUser, (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/user/:id", authenticatedUser, (req, res) => {
  const currentTime = new Date();
  let total;
  let buzzDuration;
  let buzzHours;
  var durations = [];
  var totals = [];
  User.findOne({ _id: req.params.id }).then(user => {
    if (user.buzzes.length >= 1) {
      for (i = 0; i < user.buzzes.length; i++) {
        var date2 = currentTime.getTime();
        var date1 = user.buzzes[i].dateCreated.getTime();
        var dayHourMin = getDayHourMin(date1, date2);
        var days = dayHourMin[0];
        var hours = dayHourMin[1];
        var minutes = dayHourMin[2];
        if (days >= 1) {
          hours = hours + days * 24;
        }
        if (hours == 0) {
          buzzDuration = minutes / 60;
        } else {
          buzzDuration = hours + minutes / 60;
        }
        durations.push(buzzDuration);
      }
      for (i = 0; i < user.buzzes.length; i++) {
        if (i == user.buzzes.length) {
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
        if (buzzTotal > 0) {
          totals.push(buzzTotal);
        }
        if (buzzTotal <= 0) {
          const oldBuzz = {
            numberOfDrinks: 1,
            drinkType: user.buzzes[i].drinkType,
            hours: 1,
            dateCreated: user.buzzes[i].dateCreated
          };
          const oldBuzzId = { _id: user.buzzes[i]._id };
          User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { buzzes: oldBuzzId } }
          )
            .then(user => {
              user.oldbuzzes.push(oldBuzz);
              user.save((err, user) => {
                console.log("Moved buzz to old");
              });
            })
            .then(
              setTimeout(() => {
                console.log("timeout");
              }, 500)
            );
        }
      }
      total = totals.reduce((a, b) => a + b, 0);
      if (total <= 0) {
        if (user.oldbuzzes.length >= 1) {
          User.findOne({ _id: req.params.id }).then(user => {
            var date2 = currentTime.getTime();
            var date1 = user.oldbuzzes[
              user.oldbuzzes.length - 1
            ].dateCreated.getTime();
            var dayHourMin = getDayHourMin(date1, date2);
            var days = dayHourMin[0];
            var hours = dayHourMin[1];
            var minutes = dayHourMin[2];
            user.timeSince = `${days} days, ${hours} hours, and ${minutes} minutes`;
            user.bac = 0;
            user.save((err, user) => {
              res.render("user/show", { user });
            });
          });
        } else {
          User.findOne({ _id: req.params.id }).then(user => {
            user.bac = 0;
            user.save((err, user) => {
              res.render("user/show", { user });
            });
          });
        }
      } else {
        User.findOne({ _id: req.params.id }).then(user => {
          user.bac = total;
          user.save((err, user) => {
            res.render("user/show", { user });
          });
        });
      }
    } else {
      if (user.oldbuzzes.length >= 1) {
        User.findOne({ _id: req.params.id }).then(user => {
          var date2 = currentTime.getTime();
          var date1 = user.oldbuzzes[
            user.oldbuzzes.length - 1
          ].dateCreated.getTime();
          var dayHourMin = getDayHourMin(date1, date2);
          var days = dayHourMin[0];
          var hours = dayHourMin[1];
          var minutes = dayHourMin[2];
          if ((user.buzzes.length = 0)) {
            user.bac = 0;
          }
          user.timeSince = `${days} days, ${hours} hours, and ${minutes} minutes`;
          user.save((err, user) => {
            res.render("user/show", { user });
          });
        });
      } else {
        if (user.buzzes.length == 0) {
          user.bac = 0;
        }
        user.save((err, user) => {
          res.render("user/show", { user, success: req.flash("success") });
        });
      }
    }
  });
});

router.post("/user/:id", authenticatedUser, (req, res) => {
  var newBuzz = {
    numberOfDrinks: 1,
    drinkType: req.body.drinkType,
    hours: 0
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
        total = getBAC(user.weight, user.gender, 1, req.body.drinkType, 0);
      }
      if (user.buzzes.length >= 1) {
        for (i = 0; i < user.buzzes.length - 1; i++) {
          var date2 = user.buzzes[user.buzzes.length - 1].dateCreated.getTime();
          var date1 = user.buzzes[i].dateCreated.getTime();
          var dayHourMin = getDayHourMin(date1, date2);
          var days = dayHourMin[0];
          var hours = dayHourMin[1];
          var minutes = dayHourMin[2];
          if (days >= 1) {
            hours = hours + days * 24;
          }
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
          if (buzzTotal > 0) {
            totals.push(buzzTotal);
          }
          if (buzzTotal <= 0) {
            const oldBuzz = {
              numberOfDrinks: 1,
              drinkType: user.buzzes[i].drinkType,
              hours: 1,
              dateCreated: user.buzzes[i].dateCreated
            };
            const oldBuzzId = { _id: user.buzzes[i]._id };
            User.findOneAndUpdate(
              { _id: req.params.id },
              { $pull: { buzzes: oldBuzzId } }
            ).then(user => {
              user.oldbuzzes.push(oldBuzz);
              user.save((err, user) => {
                console.log("Moved buzz to old");
              });
            });
          }
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

router.get("/user/:id/bac", authenticatedUser, (req, res) => {
  const currentTime = new Date();
  let total;
  let buzzDuration;
  let buzzHours;
  var durations = [];
  var totals = [];
  User.findOne({ _id: req.params.id }).then(user => {
    if (user.buzzes.length >= 1) {
      for (i = 0; i < user.buzzes.length; i++) {
        var date2 = currentTime.getTime();
        var date1 = user.buzzes[i].dateCreated.getTime();
        var dayHourMin = getDayHourMin(date1, date2);
        var days = dayHourMin[0];
        var hours = dayHourMin[1];
        var minutes = dayHourMin[2];
        if (days >= 1) {
          hours = hours + days * 24;
        }
        if (hours == 0) {
          buzzDuration = minutes / 60;
        } else {
          buzzDuration = hours + minutes / 60;
        }
        durations.push(buzzDuration);
      }
      for (i = 0; i < user.buzzes.length; i++) {
        if (i == user.buzzes.length) {
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
        if (buzzTotal > 0) {
          totals.push(buzzTotal);
        }
        if (buzzTotal <= 0) {
          const oldBuzz = {
            numberOfDrinks: 1,
            drinkType: user.buzzes[i].drinkType,
            hours: 1,
            dateCreated: user.buzzes[i].dateCreated
          };
          const oldBuzzId = { _id: user.buzzes[i]._id };
          User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { buzzes: oldBuzzId } }
          ).then(user => {
            user.oldbuzzes.push(oldBuzz);
            user.save((err, user) => {
              console.log("Moved buzz to old");
            });
          });
        }
      }
      total = totals.reduce((a, b) => a + b, 0);
      if (total < 0) {
        user.bac = 0;
        user.save((err, user) => {
          res.render("user/show", { user });
        });
      } else {
        user.bac = total;
        user.save((err, user) => {
          res.render("user/show", { user });
        });
      }
    } else {
      user.bac = total;
      user.save((err, user) => {
        res.render("user/show", { user });
      });
    }
  });
});

router.put("/user/:id/del", authenticatedUser, (req, res) => {
  const buzzId = { _id: req.body.index };
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { buzzes: buzzId } }
  ).then(user => {
    if (user.buzzes.length == 1) {
      user.bac = 0;
    }
    user.save((err, user) => {
      res.redirect("back");
    });
  });
});

router.put("/user/:id/olddel", authenticatedUser, (req, res) => {
  const buzzId = { _id: req.body.index };
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { oldbuzzes: buzzId } }
  ).then(user => {
    if (user.buzzes.length == 1) {
      user.bac = 0;
    }
    user.save((err, user) => {
      res.redirect("back");
    });
  });
});

module.exports = router;
