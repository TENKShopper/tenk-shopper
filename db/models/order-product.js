/*

This is a join table between Order and Product that stores priceAtOrderTime and quantity for each product in your order. Order can sum a total based on this.

TODO: Discuss this approach.

*/

const { DECIMAL, INTEGER } = require('Sequelize')

module.exports = db => db.define('orderproducts', {
  priceAtOrderTime: {
    type: DECIMAL(13, 4)
  },
  quantity: {
    type: INTEGER
  }
})

module.exports.associations = (OrderProduct, {Order, Product}) => {
  OrderProduct.belongsTo(Order)
  OrderProduct.hasMany(Product)
}
