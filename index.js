const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  console.log("I am a global middleware");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("I am a route specific middleware");
    next();
  },
  function(req, res) {
    res.send("Hello World!");
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
