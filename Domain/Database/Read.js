const db = require("./Database.JS");

user = db.prepare(`
    SELECT * FROM Logins
    `).all();

console.log(user)
