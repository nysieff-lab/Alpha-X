// Gets the item details from the DB to be returned via API 

const db = require("../Domain/Database/Database.JS");

function GetItem(PhoneModel,CaseModel) {
    Item = db.prepare(`
        SELECT
        a.PhoneID,
        a.Brand,
        a.Series,
        a.[PhoneModel],
        c.ProductID,
        c.[CaseModel],
        c.Colour,
        c.StockQuantity,
        c.Price,
        c.Image,
        c.Description
        FROM Phone a
        JOIN Product c
        ON a.PhoneID = c.PhoneID
        WHERE c.StockQuantity > 0 AND a.PhoneModel = ? AND c.CaseModel = ?;
        `).all(PhoneModel,CaseModel);
    return Item
};

function GetCartItem(ProductID) {
    CartItem = db.prepare(`
        SELECT
        a.PhoneID,
        a.Brand,
        a.Series,
        a.[PhoneModel],
        c.ProductID,
        c.[CaseModel],
        c.Colour,
        c.Price,
        c.Image,
        c.StockQuantity
        FROM Phone a
        JOIN Product c
        ON a.PhoneID = c.PhoneID
        WHERE c.ProductID = ?
        `).all(ProductID);
    return CartItem
};

function CheckStock(Cart) {
    for (let index = 0; index < Cart.length; index++) {
            const ProductID = Cart[index].ProductID;
            const OrdersItemQuantity = Cart[index].Quantity;
            Inventory = db.prepare(`
                SELECT StockQuantity
                FROM Product
                WHERE ProductID = ?
            `).get(ProductID);
            if (OrdersItemQuantity>Inventory.StockQuantity) {
                return {
                    Success: false,
                    Message: `Insufficient stock for Product ${Cart[index].Brand} ${Cart[index].Series} ${Cart[index].PhoneModel} ${Cart[index].CaseModel} ${Cart[index].Colour}. 
                    Available stock: ${Inventory.StockQuantity}. Please Reduce your order.`
                }; 
            };
            
        };
        return {
            Success: true,
            Message: "All products have sufficient stock."
        };
}

module.exports = {GetItem, GetCartItem, CheckStock}