/*

This table stores Orders and provides an instance method for calculating the order total.

The defaultScope of this model loads OrderProduct along with each order.

*/

const { DECIMAL, INTEGER, STRING, TEXT, ENUM } = require('sequelize')

const LineItem = require('./lineitem')
const Product = require('./product')

module.exports = db => db.define('orders', {
  shipping: ENUM('International', 'Overnight', 'Two-day', 'Standard'),
  creditCard: {
    type: INTEGER,
    validate: {
      isCreditCard: true
    }
  },
  instructions: TEXT
})
// {
//   defaultScope: {
//     include: [{ model: LineItem, Product }]
//   },
//   instanceMethods: {
//     calculateTotal: function() {
//       return LineItem.findAll({
//         where: {
//           orderId: this.id
//         }
//       })
//       .then(lineItems =>
//         lineItems.reduce((acc, lineItem) => acc + (lineItem.priceAtOrderTime * lineItem.quantity), 0.00))
//       .catch(err => {
//         throw err
//       })
//     }
//   }
// })

module.exports.associations = (Order, { Address, LineItem, Product }) => {
  Order.hasOne(Address, {as: 'shippingAddress'})
  Order.hasOne(Address, {as: 'billingAddress'})
  Order.belongsToMany(Product, { through: LineItem })
}
