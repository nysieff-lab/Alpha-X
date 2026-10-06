/* Gets list of items in cart from api then calculates subtotal, shipping, VAT, total and then sends back to API.
Pulls the prices of each item from the db and then calculates totals ect.
VAT: 15% (South African Standard)
Flat Shipping fee of R150 */

const db = require("../Domain/Database/Database.JS");

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


/*function InvoiceData() {
    will need OrdersID 
}*/

module.exports = SummaryData;