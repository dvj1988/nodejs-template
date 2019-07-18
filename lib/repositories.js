const knex = require("./knex");
const UserRepositoryFactory = require("./models/user/repository");
const ItemRepositoryFactory = require("./models/item/repository");

const userRepository = UserRepositoryFactory(knex);
const itemRepository = ItemRepositoryFactory(knex);

module.exports = {
  userRepository,
  itemRepository
};
