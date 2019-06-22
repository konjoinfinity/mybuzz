const express = require("express");
const userController = require("./controllers/user.js");

const app = express();

app.use("/", userController);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Running on PORT: ${app.get("port")}`);
});
