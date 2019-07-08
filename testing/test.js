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

console.log(getBAC(180, "Male", 1, "Wine", 0));
console.log(getBAC(180, "Male", 1, "Wine", 1));
console.log(getBAC(180, "Male", 1, "Beer", 0));
console.log(getBAC(180, "Male", 1, "Beer", 1));
console.log(getBAC(180, "Male", 1, "Liquor", 0));
console.log(getBAC(180, "Male", 1, "Liquor", 1));

console.log(getBAC(150, "Female", 1, "Wine", 0));
console.log(getBAC(150, "Female", 1, "Wine", 1));
console.log(getBAC(150, "Female", 1, "Beer", 0));
console.log(getBAC(150, "Female", 1, "Beer", 1));
console.log(getBAC(150, "Female", 1, "Liquor", 0));
console.log(getBAC(150, "Female", 1, "Liquor", 1));

function buzzLoop(user, req, durations, ilength) {
  var maxBac = getBAC(user.weight, user.gender, 1, "Beer", 0);
  var buzzHours;
  var totals = [];
  for (i = 0; i < user.buzzes.length; i++) {
    // user.buzzes.length
    if (i == ilength) {
      buzzHours = 0 - 0.33;
    } else {
      console.log("durations: " + durations[i] + ` - ${i}`);
      buzzHours = durations[i] - 0.33;
      console.log("Buzzloop buzzhours: " + buzzHours);
    }
    buzzTotal = getBAC(
      user.weight,
      user.gender,
      user.buzzes[i].numberOfDrinks,
      user.buzzes[i].drinkType,
      buzzHours
    );
    console.log("Buzztotal: " + buzzTotal);
    if (buzzTotal > 0) {
      // Increase only for the first buzz/drink
      if (durations[i] <= 0.33 && i == 0) {
        console.log("buzzloop durations[i]: " + durations[i] + ` - ${i}`);
        // adding placeholder amount until 20 mins have passed
        // *** 0.026073287671232875 will have to be calculated for each user
        // consider adding another conditional to check [i]
        console.log("less than 20 mins");
        var lessthan20 = maxBac - buzzTotal;
        console.log("Buzztotal: " + buzzTotal);
        console.log("Lessthan20: " + lessthan20);
        totals.push(lessthan20);
      } else {
        if (i > 0 && durations[0] <= 0.99) {
          if (durations[i] <= 0.33) {
            console.log("more than one drink, less than 20 mins");
            console.log(buzzTotal);
            var halfMaxBac = maxBac / 2;
            totals.push(halfMaxBac);
          } else {
            console.log("more than one drink, more than 20 mins");
            console.log(buzzTotal);
            totals.push(maxBac);
          }
        } else {
          console.log("else - totals pushed");
          totals.push(buzzTotal);
        }
      }
    }
    if (buzzTotal <= 0) {
      console.log("less than 0");
      var oldBuzz = {
        numberOfDrinks: 1,
        drinkType: user.buzzes[i].drinkType,
        hours: 1,
        dateCreated: user.buzzes[i].dateCreated
      };
      var oldBuzzId = { _id: user.buzzes[i]._id };
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
  console.log("totals: " + totals);
  return totals;
}
