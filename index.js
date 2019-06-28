const express = require("express");
const userController = require("./controllers/user.js");
const cors = require("cors");
const parser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "hbs");
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

app.use("/", userController);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Running on PORT: ${app.get("port")}`);
});
