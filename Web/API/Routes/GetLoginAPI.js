const express = require('express');
const getLogins = require("../../../Provider/LoginsProvider.js");
const router = express.Router();

router.post("/", async (req, res) => {
    const { UserName, Password } = req.body;
    try {
        const User = await getLogins(UserName, Password);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }

    
});

module.exports = router