'use strict'

const { STRING, TEXT, INTEGER, FLOAT } = require('sequelize')

module.exports = db => db.define('products', {
  title: {
    type: STRING,
    allowNull: false
  },
  description: TEXT,
  price: {
    type: FLOAT,
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

module.exports.associations = (Product, { Review, Order, LineItem }) => {
  Product.hasMany(Review)
  Product.belongsToMany(Order, { through: LineItem })
}
