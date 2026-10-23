// Gets the Login Details from the DB to be verified for user login
// username is processed in lower case

const db = require("../Domain/Database/Database.JS");

function GetLogins(UserName, Password) {
    UserName = UserName.toLowerCase(); //lower case conversion
    User = db.prepare(`
        SELECT * 
        FROM Logins
        WHERE Username = ? 
        AND Password = ?
    `).get(UserName, Password);
    return User
}
module.exports = GetLogins;