/*

This is a join table between Order and Product that stores priceAtOrderTime, quantity and size for each product in your order.

*/

const { DECIMAL, INTEGER, STRING } = require('Sequelize')

module.exports = db => db.define('orderproducts', {
  priceAtOrderTime: {
    type: DECIMAL(10, 2)
  },
  quantity: {
    type: INTEGER
  },
  size: {
    type: STRING
  }
})

module.exports.associations = (OrderProduct, {Order, Product}) => {
  OrderProduct.belongsTo(Order)
  OrderProduct.hasMany(Product)
}
