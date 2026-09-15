//Used by IT to add a new admin Login to the DB.
//Does not connect to UI.

const db = require("../Database/Database.JS");

db.exec(`
    INSERT INTO Logins (UserName, Password) VALUES ('Guest', '1234')
`);