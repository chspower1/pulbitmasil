const mysql = require("mysql2");
const logger = require("./logger");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MariaDB_host,
  port: process.env.MariaDB_port,
  user: process.env.MariaDB_user,
  password: process.env.MariaDB_password,
  database: process.env.MariaDB_database,
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 40,
});

const maria = pool.promise();

logger.info("Connection pool created.");

pool.on("acquire", function (connection) {
  logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on("enqueue", function () {
  logger.info("Waiting for available connection slot");
});

pool.on("release", function (connection) {
  logger.info(`Connection ${connection.threadId} released`);
});

module.exports = maria;

// const execute = async (sql, context) => {
//   try {
//     const [rows, fields] = await maria.execute(sql, context);
//     return rows;
//   } catch (err) {
//     return err;
//   }
// };
// module.exports = execute;

// async function findById(id) {
//   try {
//     const [rows, feilds] = await maria.query("SELECT * FROM USER WHERE id = ?;", [id]);
//     console.log(rows);
//   } catch (err) {
//     return err;
//   }
// }

// findById(32);
