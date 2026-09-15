// Gets the Login Details from the DB to be verified for user login

//!!!!!! must receive username as lower case 
const db = require("../Domain/Database/Database.JS");

// put it into a function to load the data into the API 

username ='admin'; // temp for testing remove when intagrating to front end via API!
password = 'admin'; // temp for testing remove when intagrating to front end via API!

User = db.prepare(`
    SELECT * 
    FROM Logins
    WHERE Username = ? 
    AND Password = ?
    `).get(username, password);

console.log(User) //REMOVE