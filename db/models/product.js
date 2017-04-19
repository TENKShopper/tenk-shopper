'use strict'

const { STRING, TEXT, INTEGER, FLOAT } = require('sequelize')

module.exports = db => db.define('products', {
  title: {
    type: STRING,
    allowNull: false
  },
  description: TEXT,
  price: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: INTEGER,
    validate: {
      min: 0
    }
  },
  photo: {
    type: STRING,
    defaultValue: 'http://placehold.it/500x500',
    validate: {
      isUrl: true
    }
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
