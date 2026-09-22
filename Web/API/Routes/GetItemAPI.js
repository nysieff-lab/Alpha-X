const express = require('express');
const {GetItem} = require("../../../Provider/ItemProvider.js");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const PhoneModel = req.body.PhoneModel;
        const CaseModel = req.body.CaseModel;
        const Item = GetItem(PhoneModel,CaseModel);
        res.json(Item); 
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve item"
        });
    }
});

module.exports = router