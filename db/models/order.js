const { DECIMAL, INTEGER, STRING, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('orders', {
  shipping: ENUM('International', 'Overnight', 'Two-Day', 'Standard'),
  instructions: TEXT,
  status: ENUM('Created', 'Processing', 'Cancelled', 'Completed')
})

module.exports.associations = (Order, { User, Address, LineItem, Product }) => {
  Order.belongsTo(User)
  Order.belongsTo(Address, {as: 'shippingAddress', foreignKey: 'shippingAddressOrder'})
  Order.belongsTo(Address, {as: 'billingAddress', foreignKey: 'billingAddressOrder'})
  Order.belongsToMany(Product, { through: LineItem })
}
