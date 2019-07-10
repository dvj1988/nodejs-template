const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.send({
    path: "/users",
    method: "get"
  });
});

userRouter.get("/:id", (req, res, next) => {
  res.send({
    path: "/users/:id",
    method: "get"
  });
});

userRouter.post("/:id", (req, res, next) => {
  res.send({
    path: "/users/:id",
    method: "post"
  });
});

userRouter.patch("/:id", (req, res, next) => {
  res.send({
    path: "/users/:id",
    method: "patch"
  });
});

userRouter.delete("/:id", (req, res, next) => {
  res.send({
    path: "/users/:id",
    method: "delete"
  });
});

module.exports = userRouter;
