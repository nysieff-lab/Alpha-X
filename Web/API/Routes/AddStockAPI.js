const express = require('express');
const {IncreaseInventory} = require('../../../Provider/InventoryProvider');
const router = express.Router();

router.post("/", (req, res) => {
    const ProductID = req.body.ProductID
    const RestockQuantity = req.body.RestockQuantity
    try {
        IncreaseInventory(RestockQuantity, ProductID);
        res.json({
            success: true,
            message: "Stock added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not add stock"
        });
    }
});

module.exports = router;