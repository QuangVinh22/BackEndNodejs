require("dotenv").config();
const mysql = require("mysql2/promise");
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
// });
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  queueLimit: 0,
  connectionLimit: 10,
});

module.exports = connection;
