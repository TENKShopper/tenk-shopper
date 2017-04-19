'use strict'

const { STRING, TEXT, INTEGER, FLOAT } = require('sequelize')

module.exports = db => db.define('products', {
  title: {
    type: STRING,
    allowNull: false
    // OB/IJM: consider also `...validate: {notEmpty: true}...`
  },
  description: TEXT,
  price: {
    type: FLOAT, // OB/IJM: use integer to avoid floating point math woes
    defaultValue: 0.00
  },
  inventory: INTEGER, // OB/IJM: consider validations, maybe min
  photo: {
    type: STRING,
    defaultValue: 'http://placehold.it/500x500'
    // OB/IJM: consider isUrl validation
  },
  gender: STRING, // OB/IJM: consider enum
  clothingType: STRING, // OB/IJM: consider enum (or possibly another model)
  size: STRING // OB/IJM: consider enum
},
{})

module.exports.associations = (Product, { Review, Order, LineItem }) => {
  Product.hasMany(Review)
  Product.belongsToMany(Order, { through: LineItem })
}
