// Updates the inventory Quantities
// Receives data from UI via API then writes to DB

const db = require("../Domain/Database/Database.JS");

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