'use strict'

const { TEXT } = require('sequelize')

module.exports = db => db.define('reviews', {
  body: {
    type: TEXT,
    validate: {
      len: {
        args: 30,
        msg: 'Review must be 30 characters in length'
      }
    }
  }
})

module.exports.associations = (Review, {Product, User}) => {
  Review.belongsTo(Product)
  Review.belongsTo(User)
}
