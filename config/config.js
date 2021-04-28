module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": 'postgres' || process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": 'postgres' || process.env.DB_DATABASE,
    "host": process.env.DB_HOSTNAME,
    "dialect": "postgres"
  }
}
