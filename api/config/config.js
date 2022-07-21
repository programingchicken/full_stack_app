
const development ={
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: './fsjstd-restapi.db',
    dialect: "sqlite",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: './fsjstd-restapi.db',
    dialect: "sqlite"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: './fsjstd-restapi.db',
    dialect: "sqlite"
  }
}

module.exports = development
