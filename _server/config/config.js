require('dotenv').config('../.env')
module.exports = {
  development: {
    username: process.env.DEVELOPMENT_DB_USERNAME,
    password: process.env.DEVELOPMENT_DB_PASSWORD,
    database: process.env.DEVELOPMENT_DB_NAME,
    host: process.env.DEVELOPMENT_HOST,
    port: process.env.DEVELOPMENT_PORT,
    dialect: process.env.DEVELOPMENT_DIALECT,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_HOST,
    port: process.env.TEST_PORT,
    dialect: process.env.TEST_DIALECT,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    dialect: process.env.PROD_DIALECT,
  }
};