const express = require('express');
const {GetCartItem} = require("../../../Provider/ItemProvider.js");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const ProductID = req.body.ProductID;
        const CartItem = GetCartItem(ProductID);
        res.json(CartItem);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve item"
        });
    }
});

module.exports = router 