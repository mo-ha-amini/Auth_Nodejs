const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class UserToken extends Model {}

UserToken.init(
    {
        // Model attributes are defined here
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'UserToken', // We need to choose the model name
    }
)

module.exports = UserToken
