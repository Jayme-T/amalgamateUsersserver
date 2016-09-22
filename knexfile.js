'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://localhost/piUsers',
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://localhost/piUsers',
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://localhost/piUsers',
    pool: {
      min: 2,
      max: 10
    }
  }
};
