const express = require('express');
const getLogins = require("../../../Provider/LoginsProvider.js");
const router = express.Router();

router.post("/", (req, res) => {
    const { UserName, Password } = req.body;
    const User = getLogins(UserName, Password);
    if (!User) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }
    res.json({
        success: true,
        message: "Authentication Successful",
        User: {
            id: User.LoginID,
            username: User.Username
        }
    });
});

module.exports = router