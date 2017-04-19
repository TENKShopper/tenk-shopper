/*

This table stores Orders and provides an instance method for calculating the order total.

The defaultScope of this model loads OrderProduct along with each order.

*/

const { DECIMAL, INTEGER, STRING, TEXT, ENUM } = require('sequelize')

const LineItem = require('./lineitem') // OB/IJM: watch out when doing this, try `db.model` instead
const Product = require('./product')

module.exports = db => db.define('orders', {
  shipping: ENUM('International', 'Overnight', 'Two-day', 'Standard'),
  creditCard: { // OB/IJM: maybe don't store this, use third-party (see Stripe)
    type: INTEGER,
    validate: {
      isCreditCard: true
    }
  },
  instructions: TEXT
})
// OB/IJM: dead code should be buried, less it rise up and kill us all
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
