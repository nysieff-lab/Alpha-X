const express = require('express');
const GetFilters = require('../../../Provider/FilterProvider');

const router = express.Router();

router.post("/", (req, res) => {
    try {
        const Filters = GetFilters()
        res.json(Filters); 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve Filters"
        });
    }
});

module.exports = router