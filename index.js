const express = require("express");
const app = express();
const port = 3000;
const routes = require("./lib/routes");
const { userRepository } = require("./lib/repositories");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  // Add authentication middleware here
  res.locals.userRepository = userRepository;
  next();
});

app.use("/api", routes);
app.listen(port, () => console.log(`Shop app listening on port ${port}!`));
