const express = require("express");
const itemRouter = express.Router();

itemRouter.get("/", (req, res, next) => {
  res.send({
    path: "/items",
    method: "get"
  });
});

itemRouter.get("/:id", (req, res, next) => {
  res.send({
    path: "/items/:id",
    method: "get"
  });
});

itemRouter.post("/:id", (req, res, next) => {
  res.send({
    path: "/items/:id",
    method: "post"
  });
});

itemRouter.patch("/:id", (req, res, next) => {
  res.send({
    path: "/items/:id",
    method: "patch"
  });
});

itemRouter.delete("/:id", (req, res, next) => {
  res.send({
    path: "/items/:id",
    method: "delete"
  });
});

module.exports = itemRouter;
