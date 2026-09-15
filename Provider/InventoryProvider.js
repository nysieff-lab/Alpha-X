// Updates the inventory Quantities
// Receives data from UI via API then writes to DB

const db = require("../Domain/Database/Database.JS");

const OrderQuantity = 5; // temp for testing REMOVE when intagrating to front end via API
const ProductID = 1; // temp for testing REMOVE when intagrating to front end via API
const RestockQuantity = 15; // temp for testing REMOVE when intagrating to front end via API

// further development needed to prevent negative stock
//Turn into functions

//inventory Decrease
Inventory = db.prepare(`
    UPDATE Product
    SET StockQuantity = StockQuantity - ?
    WHERE ProductID = ?;
`).run(OrderQuantity, ProductID);

    //REMOVE
Phone = db.prepare(`
    SELECT * FROM Product
    WHERE ProductID = 1
`).all();
console.log(Phone) //REMOVE


// Inventory Increase
function IncreaseInventory(RestockQuantity, ProductID) {
    Inventory = db.prepare(`
        UPDATE Product
        SET StockQuantity = StockQuantity + ?
        WHERE ProductID = ?;
        `).run(RestockQuantity, ProductID);
    return Inventory
}

IncreaseInventory(RestockQuantity, ProductID) //REMOVE
    //REMOVE
Phone = db.prepare(`
    SELECT * FROM Product
    WHERE ProductID = 1
    `).all();
console.log(Phone) //REMOVE