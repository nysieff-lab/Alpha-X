// Gets the Login Details from the DB to be verified for user login
// username is processed in lower case

const db = require("../Domain/Database/Database.JS");
const bcrypt = require("bcrypt");

async function GetLogins(UserName, Password) {
    UserName = UserName.toLowerCase(); //lower case conversion
    User = db.prepare(`
        SELECT * 
        FROM Logins
        WHERE Username = ?;
    `).get(UserName);

    if (!User) {
        return
    }

    const PasswordMatch = await bcrypt.compare(Password, User.Password);
    if (PasswordMatch) {
        return User
    }

    return 
}
module.exports = GetLogins;