
const development ={
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: './dev.sqlite',
    dialect: "sqlite",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: './dev.sqlite',
    dialect: "sqlite"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: './dev.sqlite',
    dialect: "sqlite"
  }
}

module.exports = development
