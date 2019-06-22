const express = require("express");
const userController = require("./controllers/user.js");
const mongoose = require("./db/connection");
const User = require("./models/user");

const app = express();

// app.use("/", userController);

app.get("/", (req, res) => {
  User.find({}).then(users => res.json(users));
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Running on PORT: ${app.get("port")}`);
});
