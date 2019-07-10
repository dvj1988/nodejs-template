const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/", function(req, res) {
  res.send("Got a POST request");
});

app.put("/user", function(req, res) {
  res.send("Got a PUT request at /user");
});

app.delete("/user", function(req, res) {
  res.send("Got a DELETE request at /user");
});

// using path params
app.get("/users/:userId/books/:bookId", function(req, res) {
  //demo in postman
  res.send(req.params);
});

// using query params
app.get("/users", function(req, res) {
  //demo in postman
  res.send(req.query);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
