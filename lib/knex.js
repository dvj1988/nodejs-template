const path = require('path');

const connection = require(path.resolve('./config/database'));
const knex = require('knex');

const knexClient = knex({
  client: 'mysql',
  connection,
});

module.exports = knexClient;
