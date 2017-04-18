module.exports = db => db.define('order', {}, {})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
