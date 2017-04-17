'use strict'

const Sequelize = require('sequelize')
const {STRING, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('product', {
  title: {
    type: STRING,
    allowNull: false
  },

  description : TEXT,

  price: {
    type: INTEGER,
    DefaultValue: 0.00
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
