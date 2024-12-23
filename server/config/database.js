const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Halal123!0",
  database: "wildfire_data",
});

module.exports = db;