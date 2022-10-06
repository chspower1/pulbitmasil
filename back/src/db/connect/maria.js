const maria = require("mysql");
require("dotenv").config();

const connect = maria.createConnection({
  host: process.env.MariaDB_host,
  port: process.env.MariaDB_port,
  user: process.env.MariaDB_user,
  password: process.env.MariaDB_password,
  database: process.env.MariaDB_database,
});

module.exports = connect;
