const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

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
