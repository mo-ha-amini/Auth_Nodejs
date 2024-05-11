const User = require('./User');
const UserToken = require('./UserToken');

User.hasOne(UserToken)
UserToken.belongsTo(User)

module.exports = {
  User,
  UserToken,
};