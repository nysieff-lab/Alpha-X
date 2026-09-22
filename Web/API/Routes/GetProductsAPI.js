const express = require('express');
const GetProducts = require("../../../Provider/ProductsProvider.js");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const Brand = req.body.Brand;
        const CaseModel = req.body.CaseModel;
        const Products = GetProducts(Brand, Brand, CaseModel, CaseModel);
        res.json(Products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve products"
        });
    }
});

module.exports = router