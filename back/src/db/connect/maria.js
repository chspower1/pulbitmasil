require("dotenv").config();
const maria = require("mysql");

const connect = maria.createConnection({
  host: "192.168.219.106",
  port: 3306,
  user: process.env.MariaDB_user,
  password: process.env.MariaDB_password,
  database: process.env.MariaDB_database,
});

module.exports = connect;
