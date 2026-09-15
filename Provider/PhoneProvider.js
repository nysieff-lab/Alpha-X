// Not sure what it is going to be used for yet

const db = require("../Domain/Database/Database.JS");

Phone = db.prepare(`
    SELECT * FROM Phone
    `).all();

console.log(Phone)