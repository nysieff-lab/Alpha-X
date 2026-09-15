const db = require("./Database.JS");

db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS unique_customer_email
    ON Customer(Email);
`);