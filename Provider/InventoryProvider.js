// Updates the inventory Quantities
// Receives data from UI via API then writes to DB

const db = require("../Domain/Database/Database.JS");

//const OrderQuantity = 5; // temp for testing REMOVE when intagrating to front end via API
//const ProductID = 1; // temp for testing REMOVE when intagrating to front end via API

//inventory Decrease
function DecreaseInventory(Cart) {
    for (let index = 0; index < Cart.length; index++) {
        const ProductID = Cart[index].ProductID;
        const OrdersItemQuantity = Cart[index].Quantity;
        Inventory = db.prepare(`
        UPDATE Product
        SET StockQuantity = StockQuantity - ?
        WHERE ProductID = ?;
        `).run(OrdersItemQuantity, ProductID);
    };  
};

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
};

module.exports = {DecreaseInventory, IncreaseInventory};