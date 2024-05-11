const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const {
    verifyToken,
    verifyRefreshToken,
} = require('../middlewares/auth.middleware')

router.post('/signup/', userController.signUp)
router.post('/signin/', userController.signIn)
router.get('/logout/', verifyToken, userController.logout)
router.post('/refreshtoken/', verifyRefreshToken, userController.getRefreshToken)

module.exports = router
