const express = require("express");
const userController = require("./controllers/user.js");
const cors = require("cors");
const parser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

app.set("view engine", "hbs");
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(methodOverride("_method"));
app.use(flash());

app.use("/", userController);

app.use(
  session({
    secret: "MyBuzz1234",
    resave: false,
    saveUninitialized: false
  })
);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Running on PORT: ${app.get("port")}`);
});
