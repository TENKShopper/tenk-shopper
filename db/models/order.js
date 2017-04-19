const { DECIMAL, INTEGER, STRING, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('orders', {
  shipping: ENUM('International', 'Overnight', 'Two-day', 'Standard'),
  instructions: TEXT,
  status: ENUM('Created', 'Processing', 'Cancelled', 'Completed')
})

module.exports.associations = (Order, { User, Address, LineItem, Product }) => {
  Order.belongsTo(User)
  Order.hasOne(Address, {as: 'shippingAddress'})
  Order.hasOne(Address, {as: 'billingAddress'})
  Order.belongsToMany(Product, { through: LineItem })
}
