/*

This is a join table between Order and Product that stores priceAtOrderTime, quantity and size for each product in your order.

*/

const { FLOAT, INTEGER } = require('sequelize')

module.exports = db => db.define('lineitems', {
  priceAtOrderTime: {
    type: FLOAT,
    defaultValue: 0.00
  },
  quantity: INTEGER,
}, {})

module.exports.associations = (LineItem, { Order, Product }) => {
}

