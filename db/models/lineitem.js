/*

This is a join table between Order and Product that stores orderPrice and quantity for each product in your order.

*/

const { FLOAT, INTEGER } = require('sequelize'),
  db = require('APP/db')

module.exports = db => db.define('lineitems', {
  orderPrice: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  quantity: INTEGER,
}, {
  scopes: {
    withProductAndOrder: {
      include: [
          { model: db.model('products') },
          { model: db.model('orders') }
      ]
    }
  }
})

module.exports.associations = (LineItem, { Order, Product }) => {
  LineItem.belongsTo(Product)
  LineItem.belongsTo(Order)
}

