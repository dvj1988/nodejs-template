const express = require("express");
const orderRouter = express.Router();

orderRouter.get("/", (req, res, next) => {
  res.send({
    path: "/orders",
    method: "get"
  });
});

orderRouter.get("/:id", (req, res, next) => {
  res.send({
    path: "/orders/:id",
    method: "get"
  });
});

orderRouter.post("/:id", (req, res, next) => {
  res.send({
    path: "/orders/:id",
    method: "post"
  });
});

orderRouter.patch("/:id", (req, res, next) => {
  res.send({
    path: "/orders/:id",
    method: "patch"
  });
});

orderRouter.delete("/:id", (req, res, next) => {
  res.send({
    path: "/orders/:id",
    method: "delete"
  });
});

module.exports = orderRouter;
