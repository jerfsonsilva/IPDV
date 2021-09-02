var env = require("../env")
var knex = require('knex')({
    client: 'mysql2',
    connection: env.conexao
  });

module.exports = knex