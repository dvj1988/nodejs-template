var express = require("express");
var router = express.Router();
const userRouter = require("./user");
const itemRouter = require("./item");
const orderRouter = require("./order");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/orders", orderRouter);

module.exports = router;
