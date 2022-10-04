const maria =  require("mysql");

const connect = maria.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "elice05team09",
    database: "plogging"
});

module.exports = connect;