const express = require('express');

const orderRouter = express.Router();
const {
  getOrderById,
  listOrders,
  createOrder,
  deleteOrder,
  getOrderCustomer,
  getOrderItems,
  addOrderItem,
} = require('./resolvers');

orderRouter.post('/', createOrder);
orderRouter.get('/', listOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.delete('/:id', deleteOrder);

orderRouter.get('/:id/customer', getOrderCustomer);

orderRouter.get('/:id/items', getOrderItems);
orderRouter.post('/:id/items', addOrderItem);

module.exports = orderRouter;
