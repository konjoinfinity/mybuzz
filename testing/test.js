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
console.log(getBAC(180, "Male", 1, "Wine", 0.33));

// New field will have to be created for buzzes - holdTime which is plus one hour
// from buzz[0].dateCreated, this will become the new (invisible) dateCreated for
// that buzz, all calculations are made from that timestamp, will need to Calculate
// this new timestamp when a new buzz is added from the holdTime property of the
// last buzz in the array -
// holdTime = user.buzzes[current array position - 1].dateCreated - 1.0 (1 hour)

// For future usage with active graph display rendering

function buzzLoop(user, req, durations, ilength) {
  // -0.33 = 20 minute day for BAC rise
  var maxBac = getBAC(user.weight, user.gender, 1, "Beer", -0.33);
  var buzzHours;
  var totals = [];
  for (i = 0; i < user.buzzes.length; i++) {
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
        // consider adding another conditional to check [i]
        console.log("less than 20 mins");
        console.log(maxBac);
        var lessthan20 = maxBac - buzzTotal;
        console.log("Buzztotal: " + buzzTotal);
        console.log("Lessthan20: " + lessthan20);
        totals.push(lessthan20);
      } else {
        if (i > 0 && durations[0] <= 0.99) {
          if (durations[i] <= 0.33 || durations[i] === undefined) {
            console.log("durations[i]: " + durations[i]);
            console.log("more than one drink, less than 20 mins");
            console.log(buzzTotal);
            var oneThirdMaxBac = maxBac * (1 / 3);
            console.log(oneThirdMaxBac);
            totals.push(oneThirdMaxBac);
          } else {
            console.log("durations[i]: " + durations[i]);
            console.log("more than one drink, more than 20 mins");
            console.log(buzzTotal);
            var twoThirdsMaxBac = maxBac * (2 / 3);
            console.log(twoThirdsMaxBac);
            totals.push(twoThirdsMaxBac);
          }
        } else {
          // add conditional to check durations[1], if (durations[1] is present) {
          //  secondDrink = getBAC(user.weight, user.gender, 1, user.buzzes[1].drinkType, 0);
          //    }  Might have to add a new property to the buzz, start bac countdown (after one hour)
          // Create a new duration function to get the timestamp from bac countdown, subtract current time
          // from bac countdown
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
            // still not rendering, buzzes are no longer shown but do not appear in oldbuzzes
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
