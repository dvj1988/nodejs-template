const express = require('express');

const router = express.Router();
const userRouter = require('./models/user/route');
const itemRouter = require('./models/item/route');
const orderRouter = require('./models/order/route');

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/orders', orderRouter);

module.exports = router;
