const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {}

User.init(
    {
        // Model attributes are defined here
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 20], // Enforces password length between 6 and 20 characters
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Enforces unique emails
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Enforces unique emails
            validate: {
                isEmail: true,
            },
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    }
)

User.beforeCreate(async (user, options) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    } catch (err) {
        return next(err)
    }
})

User.findByCredentionals = async function (username, password) {
    const user = await User.findOne({
        where: {
            username: username,
        },
    })

    if (!user) {
        throw new Error('Invalid credentials')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid credentials')
    }

    return user
}

module.exports = User
