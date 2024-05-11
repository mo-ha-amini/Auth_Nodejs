const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middlewares/auth.middleware');

router.get('/dashboard/', verifyToken, (req, res) => {
    return res.status(200).json({ message: "Hello from dashboard."});
});

module.exports = router;