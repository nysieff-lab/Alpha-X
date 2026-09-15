//Used by IT to add a new Case Models for each phone Model to the DB.
//Does not connect to UI.

const db = require("../Database/Database.JS");
/*db.exec(`DELETE  FROM Product;
UPDATE sqlite_sequence SET seq = 0 WHERE name = 'Product';`);*/

db.exec(`
    INSERT INTO Product (PhoneID, CaseModel, Colour, StockQuantity, Price) 
    VALUES
    (30, 'Classic', 'Green', 100, 300),
    (30, 'Classic', 'Black', 100, 300),
    (30, 'Classic', 'Orange', 100, 300),
    (30, 'Citizen', 'Green', 100, 400),
    (30, 'Citizen', 'Black', 100, 400),
    (30, 'Citizen', 'Orange', 100, 400),
    (30, 'Carbon', 'Green', 100, 500),
    (30, 'Carbon', 'Black', 100, 500),
    (30, 'Carbon', 'Orange', 100, 500),
    (31, 'Classic', 'Green', 100, 300),
    (31, 'Classic', 'Black', 100, 300),
    (31, 'Classic', 'Orange', 100, 300),
    (31, 'Citizen', 'Green', 100, 400),
    (31, 'Citizen', 'Black', 100, 400),
    (31, 'Citizen', 'Orange', 100, 400),
    (31, 'Carbon', 'Green', 100, 500),
    (31, 'Carbon', 'Black', 100, 500),
    (31, 'Carbon', 'Orange', 100, 500),
    (32, 'Classic', 'Green', 100, 300),
    (32, 'Classic', 'Black', 100, 300),
    (32, 'Classic', 'Orange', 100, 300),
    (32, 'Citizen', 'Green', 100, 400),
    (32, 'Citizen', 'Black', 100, 400),
    (32, 'Citizen', 'Orange', 100, 400),
    (32, 'Carbon', 'Green', 100, 500),
    (32, 'Carbon', 'Black', 100, 500),
    (32, 'Carbon', 'Orange', 100, 500),
    (33, 'Classic', 'Green', 100, 300),
    (33, 'Classic', 'Black', 100, 300),
    (33, 'Classic', 'Orange', 100, 300),
    (33, 'Citizen', 'Green', 100, 400),
    (33, 'Citizen', 'Black', 100, 400),
    (33, 'Citizen', 'Orange', 100, 400),
    (33, 'Carbon', 'Green', 100, 500),
    (33, 'Carbon', 'Black', 100, 500),
    (33, 'Carbon', 'Orange', 100, 500),
    (34, 'Classic', 'Green', 100, 300),
    (34, 'Classic', 'Black', 100, 300),
    (34, 'Classic', 'Orange', 100, 300),
    (34, 'Citizen', 'Green', 100, 400),
    (34, 'Citizen', 'Black', 100, 400),
    (34, 'Citizen', 'Orange', 100, 400),
    (34, 'Carbon', 'Green', 100, 500),
    (34, 'Carbon', 'Black', 100, 500),
    (34, 'Carbon', 'Orange', 100, 500),
    (35, 'Classic', 'Green', 100, 300),
    (35, 'Classic', 'Black', 100, 300),
    (35, 'Classic', 'Orange', 100, 300),
    (35, 'Citizen', 'Green', 100, 400),
    (35, 'Citizen', 'Black', 100, 400),
    (35, 'Citizen', 'Orange', 100, 400),
    (35, 'Carbon', 'Green', 100, 500),
    (35, 'Carbon', 'Black', 100, 500),
    (35, 'Carbon', 'Orange', 100, 500),
    (36, 'Classic', 'Green', 100, 300),
    (36, 'Classic', 'Black', 100, 300),
    (36, 'Classic', 'Orange', 100, 300),
    (36, 'Citizen', 'Green', 100, 400),
    (36, 'Citizen', 'Black', 100, 400),
    (36, 'Citizen', 'Orange', 100, 400),
    (36, 'Carbon', 'Green', 100, 500),
    (36, 'Carbon', 'Black', 100, 500),
    (36, 'Carbon', 'Orange', 100, 500)
`);

user = db.prepare(`
    SELECT * FROM Product
    `).all();
console.log(user)