module.exports = db => db.define('order', {}, {})

module.exports.associations = (Order, {User, Favorite}) => {
  Order.belongsTo(User)
  User.hasMany(Order)
}
