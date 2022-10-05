const maria = require("mysql");

const connect = maria.createConnection({
  host: "116.39.248.220",
  port: 80,
  user: "elice",
  password: "elice05team09",
  database: "plogging",
});

module.exports = connect;
