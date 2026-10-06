const express = require('express');
const SummaryData = require('../../../Provider/CheckoutProvider.js');
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const Cart = req.body;
        const Data = SummaryData(Cart)
        res.json(Data)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve Data"
        });
    }
});

module.exports = router