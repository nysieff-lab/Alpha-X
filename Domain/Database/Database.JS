const Database = require("better-sqlite3");
const db = new Database("./Domain/Database/AlpaX.DB");

console.log("SQLite DB connected successfully");

module.exports = db;