const express = require('express');
const { PlaceOrder } = require('../../../Provider/CheckoutProvider');
const router = express.Router();

router.post("/",(req, res)=>{
    try {
        const {Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country, Cart} = req.body;

        if (!Array.isArray(Cart) || Cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Your cart is empty.'
            });}

        const Invoice = PlaceOrder(Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country, Cart);
        return res.status(200).json({
            success: true,
            message: "Order Placed. Thank you for shopping with us.",
            Invoice
        });
    } catch (error) {
        console.error('Could not place order:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to place your order. Please try again.'
        });
    }
});

module.exports = router