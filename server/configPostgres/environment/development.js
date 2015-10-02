'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // Postgres connection options
  postgres: {
    connection: {
    host     : process.env.RDS_HOSTNAME || '127.0.0.1',
    user     : process.env.RDS_USERNAME || 'nulux',
    password : process.env.RDS_PASSWORD || 'nuluxadmin01',
    database : process.env.RDS_DATABASE || 'nulux',
    charset  : 'utf8'
    }
  }
};
