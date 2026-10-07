// Updates the inventory Quantities
// Receives data from UI via API then writes to DB

const db = require("../Domain/Database/Database.JS");

//const OrderQuantity = 5; // temp for testing REMOVE when intagrating to front end via API
//const ProductID = 1; // temp for testing REMOVE when intagrating to front end via API

// further development needed to prevent negative stock
//for decrease maybe have it recive the cart and use a for loop

//inventory Decrease
function DecreaseInventory() {
    Inventory = db.prepare(`
        UPDATE Product
        SET StockQuantity = StockQuantity - ?
        WHERE ProductID = ?;
    `).run(OrderQuantity, ProductID);
}

    //REMOVE
/*Phone = db.prepare(`
    SELECT * FROM Product
    WHERE ProductID = 1
`).all();
console.log(Phone) //REMOVE*/


// Inventory Increase
function IncreaseInventory(RestockQuantity, ProductID) {
    Inventory = db.prepare(`
        UPDATE Product
        SET StockQuantity = StockQuantity + ?
        WHERE ProductID = ?;
        `).run(RestockQuantity, ProductID);
    return Inventory
}

module.exports = {IncreaseInventory};