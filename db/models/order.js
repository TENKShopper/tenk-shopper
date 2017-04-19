const { DECIMAL, INTEGER, STRING, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('orders', {
  shipping: ENUM('International', 'Overnight', 'Two-day', 'Standard'),
  instructions: TEXT,
  status: ENUM()
})

module.exports.associations = (Order, { Address, LineItem, Product }) => {
  Order.hasOne(Address, {as: 'shippingAddress'})
  Order.hasOne(Address, {as: 'billingAddress'})
  Order.belongsToMany(Product, { through: LineItem })
}
