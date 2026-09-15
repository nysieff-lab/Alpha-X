//Used to add the Product Description to the Product Table.
//Done manually by IT. Doesn't connect to UI.

const db = require("../Database/Database.JS");

db.exec(`
    UPDATE Product
    SET Description = NULL
    WHERE CaseModel = 'Classic';
`);

db.exec(`
    UPDATE Product
    SET Description = NULL
    WHERE CaseModel = 'Citizen';
`);

db.exec(`
    UPDATE Product
    SET Description = NULL
    WHERE CaseModel = 'Carbon';
`);

    user = db.prepare(`
        SELECT * FROM Product
        `).all();
    
    console.log(user)