const { DECIMAL, INTEGER, STRING, TEXT, ENUM } = require('Sequelize')

const OrderProduct = require('./order-product')

module.exports = db => db.define('orders', {
  shipping: {
    type: ENUM('International', 'Overnight', 'Two-day', 'Standard')
  },
  creditCard: {
    type: INTEGER,
    validate: {
      isCreditCard: true
    }
  },
  instructions: {
    type: TEXT
  }
}, {
  defaultScope: {
    include: [{ model: OrderProduct }]
  },
  instanceMethods: {
    calculateTotal: function() {
      this.getDataValue
    }
  }
})

module.exports.associations = (Order, { Address }) => {
  Order.hasOne(Address, {as: 'shippingAddress'})
  Order.hasOne(Address, {as: 'billingAddress'})
}
