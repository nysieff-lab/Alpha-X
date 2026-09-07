const db = require("./Database.JS");

db.exec(`
    INSERT INTO Logins (UserName, Password) VALUES ('Guest', '1234')
`);