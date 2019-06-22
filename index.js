const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json("MyBuzz");
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Running on PORT: ${app.get("port")}`);
});
