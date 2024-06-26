require('dotenv').config()
const jwt = require('jsonwebtoken')
const { UserToken, User } = require('../models')

const generateRefreshToken = async (user_id) => {
    try {
        const refresh_token = jwt.sign(
            { sub: user_id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_TIME }
        )

        const user = await User.findOne({
            where:{
                id : user_id
            }
        })

        if(!user){
            throw Error('User Id not found')
        }
        await UserToken.create({
            UserId: user_id,
            token: refresh_token,
        })
        return refresh_token

    } catch (error) {
        console.error('Error generating refresh token:', error.message)
    }
}


module.exports={
    generateRefreshToken
}