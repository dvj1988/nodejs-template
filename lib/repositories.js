const knex = require('./knex');
const UserRepositoryFactory = require('./models/user/repository');
const ItemRepositoryFactory = require('./models/item/repository');
const OrderRepositoryFactory = require('./models/order/repository');

const userRepository = UserRepositoryFactory(knex);
const itemRepository = ItemRepositoryFactory(knex);
const orderRepository = OrderRepositoryFactory(knex);

module.exports = {
  userRepository,
  itemRepository,
  orderRepository
};
