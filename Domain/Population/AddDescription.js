//Used to add the Product Description to the Product Table.
//Done manually by IT. Doesn't connect to UI.

const db = require("../Database/Database.JS");

db.exec(`
    UPDATE Product
    SET Description = 'Our classic series cases are made from a durable silicone for a tough protective shell. Perfect for everyday use. Available in multiple colours.'
    WHERE CaseModel = 'Classic';
`);

db.exec(`
    UPDATE Product
    SET Description = 'Our citizen series cases are made from a plastic reinforced silicone shell forming a semi rigid protective shell. Designed for those who need a bit of extra protection for their devices. Available in multiple colours.'
    WHERE CaseModel = 'Citizen';
`);

db.exec(`
    UPDATE Product
    SET Description = 'Our carbon series cases are made from a blend of carbon fibre and polyurethane rubber forming the ultimate protective shell. Built for those who need the ultimate protection for their device in the most extreme of environments. Available in multiple colours.'
    WHERE CaseModel = 'Carbon';
`);

    user = db.prepare(`
        SELECT * FROM Product
        `).all();
    
    console.log(user)