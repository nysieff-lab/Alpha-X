// Gets the Phone and Product details from the DB to be returned via API for the Product Grid.

const db = require("../Domain/Database/Database.JS");

    CaseModel = ''; // temp for testing remove when intagrating to front end via API
    Brand = 'Apple'; // temp for testing remove when intagrating to front end via API.

function GetProducts(Brand, Brand, CaseModel, CaseModel) {
    Products = db.prepare(`
        SELECT DISTINCT
        p.PhoneID,
        p.Brand,
        p.Series,
        p.[PhoneModel],
        c.ProductID,
        c.[CaseModel],
        c.Price,
        c.Image
        FROM Phone p
        JOIN Product c
        ON p.PhoneID = c.PhoneID
        WHERE (? = '' OR p.Brand = ?) 
        AND (? = '' OR c.CaseModel = ?)
        GROUP BY
            p.PhoneID,
            p.Brand,
            p.Series,
            p.PhoneModel,
            c.CaseModel
        ORDER BY 
            p.PhoneModel,
            c.CaseModel;
        `).all(Brand, Brand, CaseModel, CaseModel); 
    return Products
}

GetProducts(Brand, Brand, CaseModel, CaseModel) // REMOVE
console.log(Products) //REMOVE