const mongoose = require("mongoose");
mongoose.Promise = Promise;

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  console.log("Production Database Connection Successful");
} else {
  mongoose.connect("mongodb://localhost/mybuzz", { useNewUrlParser: true });
  console.log("Development Database Connection Successful");
}

module.exports = mongoose;
