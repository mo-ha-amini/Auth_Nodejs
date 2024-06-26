require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User, UserToken } = require('../models/index')
const { generateRefreshToken } = require('../utils/jwtToken')

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = await User.create({ username, email, password })

        res.status(201).json({
            message: 'Registered successfully.',
            data: user,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.signIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findByCredentionals(username, password)

        const accessToken = jwt.sign(
            { sub: user.id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_TIME }
        )
        const refreshToken = await generateRefreshToken(user.id)

        res.status(200).json({
            message: 'login success',
            data: { accessToken, refreshToken },
        })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

exports.logout = async (req, res) => {
    const user_id = req.userData.sub
    try {
        // remove the refresh token
        await UserToken.destroy({
            where: {
                UserId: user_id,
            },
        })
        return res.status(200).json({ message: 'logout success.' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getRefreshToken = async (req, res) => {
    const user_id = req.userData.sub
    try {
        const accessToken = jwt.sign(
            { sub: user_id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_TIME }
        )
        const refreshToken = await generateRefreshToken(user_id)
        return res.json({
            status: true,
            message: 'success',
            data: { accessToken, refreshToken },
        })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
