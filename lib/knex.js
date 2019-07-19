const knex = require('knex');
const connection = require('../config/database');

const knexClient = knex({
  client: 'mysql',
  connection
});

module.exports = knexClient;
