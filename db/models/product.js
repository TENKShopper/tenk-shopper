'use strict'

const Sequelize = require('sequelize')
const {STRING, TEXT, INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('product', {
  title: {
    type: STRING,
    allowNull: false
  },

  description : TEXT,

  price: {
    type: DECIMAL(10,2),
    defaultValue: 0.00
  },

  inventory: INTEGER,

  photo: {
    type: STRING,
    allowNull: false
  },

  gender: STRING,

  clothingType: STRING

})


module.exports.associations = (Product, {Order, Review}) => {
  Product.hasMany(Review, {as: 'ProductReviews'})
  Product.belongsToMany(Order, {through: 'ProductOrders'})
}
