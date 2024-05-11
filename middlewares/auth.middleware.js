require('dotenv').config()
const jwt = require('jsonwebtoken')
const { UserToken, User } = require('../models')

function verifyToken(req, res, next) {
    try {
        // Bearer tokenstring
        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.userData = decoded

        req.token = token
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Your session is not valid.',
            data: error,
        })
    }
}

async function verifyRefreshToken(req, res, next) {
    const token = req.body.token

    if (token === null)
        return res.status(401).json({ message: 'Invalid request.' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        req.userData = decoded

        // verify if token is in store or not
        const data = await UserToken.findOne({
            where: {
                UserId: decoded.sub.toString(),
            },
            raw: true,

        })

        if (!data) {
            return res
                .status(401)
                .json({ message: 'Invalid request. Token is not in store.' })
        }

        if (data.token != token) {
            return res.status(401).json({
                message: 'Invalid request. Token is not same in store.',
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Your session is not valid.',
            data: error.message,
        })
    }
}

module.exports = {
    verifyToken,
    verifyRefreshToken,
}
