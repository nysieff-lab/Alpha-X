const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "AlphaX.db");
const db = new Database(dbPath) 

console.log("SQLite DB connected successfully");

module.exports = db;