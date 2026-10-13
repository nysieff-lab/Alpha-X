//wites the order details to db called from placeorder function returns the Order ID for the invoice

const db = require("../Domain/Database/Database.JS");

//writes order details
function Order(CustomerID, AddressID, Cart) {
    //Date is in Format YYYY/MM/DD 
    const CurrentDate = new Date();
    const OrderDate = new Intl.DateTimeFormat('en-ZA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(CurrentDate);

    const Delivery = 150;
    let SubTotal = 0;

    for (let index = 0; index < Cart.length; index++) { 
            const ProductID = Cart[index].ProductID;
            const Quantity = Cart[index].Quantity;
            PriceField = db.prepare(`
                SELECT Price
                FROM Product
                WHERE ProductID = ?;
            `).get(ProductID);
            
            SubTotal = SubTotal + (PriceField.Price * Quantity);
        };
    const TotalAmount = SubTotal + Delivery;

    //Insert Order into DB
    AddNewOrder  = db.prepare(`
        INSERT INTO Orders (CustomerID, AddressID, OrderDate, TotalAmount)
        VALUES (?, ?, ?, ?);
    `).run(CustomerID, AddressID, OrderDate, TotalAmount); 

    const OrdersID = AddNewOrder.lastInsertRowid;
    
    //Inserts each order item
    for (let index = 0; index < Cart.length; index++) { 
        const ProductID = Cart[index].ProductID;
        const OrdersItemQuantity = Cart[index].Quantity;
        const OrdersItemPrice = db.prepare(`
            SELECT Price
            FROM Product
            WHERE ProductID = ?;
            `).get(ProductID).Price;

        db.prepare(`
        INSERT INTO OrdersDetails (OrdersID, ProductID, OrdersItemQuantity, OrdersItemPrice)
        VALUES (?, ?, ?, ?);
        `).run(OrdersID, ProductID, OrdersItemQuantity, OrdersItemPrice); 
    }
    return OrdersID //for invoice 
};

module.exports = {Order};