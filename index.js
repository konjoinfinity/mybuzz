const express = require("express");
const userController = require("./controllers/user.js");
const cors = require("cors");
const parser = require("body-parser");
const methodOverride = require("method-override");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const RememberMeStrategy = require("passport-remember-me").Strategy;

const app = express();

if (process.env.NODE_ENV == "production") {
  prodDevSecret = process.env.PROD_SECRET;
} else {
  prodDevSecret = "MyBuZzH3Lp5P30p1312345678";
}

if (process.env.NODE_ENV == "production") {
  pJsSecret = process.env.PJS_SECRET;
} else {
  pJsSecret = "MyBuZzH3Lp5P30p87654321";
}

app.set("view engine", "hbs");
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(methodOverride("_method"));

app.use(cookieParser());

app.use(
  session({
    secret: prodDevSecret,
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(
  passport.session({
    secret: pJsSecret,
    cookie: { secure: true, maxAge: 604800000 }
  })
);
app.use(passport.authenticate("remember-me"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  global.user = req.user;
  res.locals.user = req.user;
  next();
});

app.use("/", userController);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Running on PORT: ${app.get("port")}`);
});
