const express = require('express');
const { CheckStock } = require('../../../Provider/ItemProvider');
const router = express.Router();


router.post("/", (req, res) => {
    try {
        const Cart = req.body;
        const result = CheckStock(Cart);
        
        if (!result.Success) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Success: false,
            Message: "An error occurred during stock check."
        });
    }
});

module.exports = router;