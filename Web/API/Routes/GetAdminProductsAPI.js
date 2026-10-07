const express = require('express');
const { GetAdminProducts } = require('../../../Provider/ProductsProvider');
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const Brand = req.body.Brand;
        const Series = req.body.Series;
        const PhoneModel = req.body.PhoneModel;
        const CaseModel = req.body.CaseModel;
        const Colour = req.body.Colour;
        const AdminProducts = GetAdminProducts(Brand, Brand, Series, Series, PhoneModel, PhoneModel, CaseModel, CaseModel, Colour, Colour);
        res.json(AdminProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve products"
        });
    }
});

module.exports = router