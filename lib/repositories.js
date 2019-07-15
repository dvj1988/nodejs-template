const knex = require("./knex");
const UserRepositoryFactory = require("./models/user/repository");

const userRepository = UserRepositoryFactory(knex);

module.exports = {
  userRepository
};
