// Gets the Login Details from the DB to be verified for user login
// username is processed in lower case

const db = require("../Domain/Database/Database.JS");

/*username ='admin'; // temp for testing remove when intagrating to front end via API!
password = 'admin'; // temp for testing remove when intagrating to front end via API!*/

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