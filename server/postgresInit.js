var configPostgres = require('./configPostgres/environment/development.js');
var knex = require('knex')({
  client: 'pg',
  connection: configPostgres.postgres.connection
});

var db = require('bookshelf')(knex);

db.plugin('registry');

db.knex.schema.hasTable('users').then(function(exists){
  if (!exists) {
    db.knex.schema.createTable('users', function(users){
      users.increments('_id').primary().notNullable();
      users.string('name', 25).notNullable();
      users.string('email', 90).unique().notNullable(); 
      users.string('role', 10).notNullable().defaultTo('user');
      users.string('organisation', 10).notNullable().defaultTo('elanor');
      users.string('building', 20).notNullable().defaultTo('auburn_central');
      users.string('hashedPassword',100).notNullable();
      users.string('provider', 20).nullable();
      users.timestamp('lastLogin', true).nullable();
      users.string('language', 10).notNullable().defaultTo('en_us');
      users.timestamps();
    }).then(function(table){
      console.log('created',table);
    })
  }
});

module.exports = db;