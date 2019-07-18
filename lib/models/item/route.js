const express = require('express');

const itemRouter = express.Router();
const {
  getItemById,
  listItems,
  createItem,
  updateItem,
  deleteItem
} = require('./resolvers');

itemRouter.post('/', createItem);
itemRouter.get('/', listItems);
itemRouter.get('/:id', getItemById);
itemRouter.patch('/:id', updateItem);
itemRouter.delete('/:id', deleteItem);

module.exports = itemRouter;
