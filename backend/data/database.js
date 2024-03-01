const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "foodapp",
  user: "root",
  password: "MyPass15@",
});

module.exports = pool;
