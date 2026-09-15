// Gets the item details from the DB to be returned via API 

const db = require("../Domain/Database/Database.JS");

    PhoneModel = 'S20'; // temp for testing
    CaseModel = 'Classic'; // temp for testing remove when intagrating to front end via API

function GetItems(PhoneModel,CaseModel) {
    Item = db.prepare(`
        SELECT
        a.PhoneID,
        a.Brand,
        a.Series,
        a.[PhoneModel],
        c.ProductID,
        c.[CaseModel],
        c.Colour,
        c.Price
        FROM Phone a
        JOIN Product c
        ON a.PhoneID = c.PhoneID
        WHERE a.PhoneModel = ? AND c.CaseModel = ?
        `).all(PhoneModel,CaseModel);
    return Item
}

GetItems(PhoneModel,CaseModel) //REMOVE
console.log(Item) //REMOVE