/*

This is a join table between Order and Product that stores priceAtOrderTime, quantity and size for each product in your order.

*/

const { DECIMAL, INTEGER, STRING } = require('sequelize')

module.exports = db => db.define('lineitems', {
  priceAtOrderTime: {
    type: DECIMAL(10, 2),
    defaultValue: 0.00
  },
  quantity: INTEGER,
}, {})

module.exports.associations = (LineItem, { Order, Product }) => {
  LineItem.belongsTo(Order)
  LineItem.hasMany(Product)
}
