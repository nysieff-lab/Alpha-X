/* Gets list of items in cart from api then calculates subtotal, shipping, VAT, total and then sends back to API.
Pulls the prices of each item from the db and then calculates totals ect.
VAT: 15% (South African Standard)
Flat Shipping fee of R150 */

const db = require("../Domain/Database/Database.JS");
const {Customer} = require("./CustomerProvider");
const { DecreaseInventory } = require("./InventoryProvider");
const {Order} = require("./OrderProvider");

function SummaryData(Cart) {  
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
    }
    const Total = SubTotal + Delivery;
    const VAT = 0.15 * Total;

    return {SubTotal, Delivery, Total, VAT}
}

function PlaceOrder(Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country, Cart) {
    //calls  the functions
    //Customer => Stores customer data and their address
    //OrderDetails => Stores the Order details
    //DecreaseInventory => updates the inventory levels of the purchased items
    //InvoiceData => gets the details of the order from the DB for the invoice
    const CustomerData = Customer(Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country);
    
    const { CustomerID, AddressID } = CustomerData;
    const OrderData = Order(CustomerID, AddressID, Cart);
    DecreaseInventory(Cart);

    const OrdersID = OrderData;
    const Invoice = InvoiceData(CustomerID, AddressID, OrdersID);
    return Invoice
}

function InvoiceData(CustomerID, AddressID, OrdersID) {
    const Delivery = 150;
    CustomerInfo = db.prepare(`
        SELECT * 
        FROM Customer 
        WHERE CustomerID = ?;
        `).get(CustomerID);
    AddressInfo = db.prepare(`
        SELECT * 
        FROM Address 
        WHERE AddressID = ?;
        `).get(AddressID);
    OrderDetails = db.prepare(`
        SELECT OrdersID, OrderDate, TotalAmount
        FROM Orders
        WHERE OrdersID = ?;
        `).get(OrdersID);
    OrderItems = db.prepare(`
        SELECT
        od.OrdersItemID,
        od.OrdersID,
        od.ProductID,
        ph.Brand,
        ph.Series,
        ph.PhoneModel,
        p.CaseModel,
        p.Colour,
        od.OrdersItemQuantity AS Quantity,
        od.OrdersItemPrice AS Price,
        (od.OrdersItemQuantity * od.OrdersItemPrice) AS ItemTotal
        FROM OrdersDetails od
        JOIN Product p
            ON od.ProductID = p.ProductID
        JOIN Phone ph
            ON p.PhoneID = ph.PhoneID
        WHERE od.OrdersID = ?;
    `).all(OrdersID);
    const TotalAmount = OrderDetails.TotalAmount;
    const SubTotal = TotalAmount - Delivery;
    const VAT = 0.15 * TotalAmount;
   const InvoiceOrderDetails = {...OrderDetails, SubTotal, Delivery, VAT}
    return {CustomerInfo, AddressInfo, OrderDetails: InvoiceOrderDetails, OrderItems}
}

module.exports = {SummaryData, PlaceOrder};