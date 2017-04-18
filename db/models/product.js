'use strict'

const { STRING, TEXT, INTEGER, DECIMAL } = require('sequelize')

module.exports = db => db.define('products', {
  title: {
    type: STRING,
    allowNull: false
  },
  description: TEXT,
  price: {
    type: DECIMAL(10, 2),
    defaultValue: 0.00
  },
  inventory: INTEGER,
  photo: {
    type: STRING,
    defaultValue: 'http://placehold.it/500x500'
  },
  gender: STRING,
  clothingType: STRING,
  size: STRING
},
{})

module.exports.associations = (Product, { Review }) => {
  Product.hasMany(Review)
}
