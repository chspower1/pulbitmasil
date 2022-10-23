import mysql from "mysql2";
import logger from "./logger";
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

export default maria;
