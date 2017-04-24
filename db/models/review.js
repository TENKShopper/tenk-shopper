'use strict'

const { TEXT, INTEGER } = require('sequelize')

module.exports = db => db.define('reviews', {
  body: {
    type: TEXT,
    validate: {
      len: {
        args: 30,
        msg: 'Review must be 30 characters in length'
      }
    }
  },
  // rating: {
  //   type: INTEGER,
  //   defaultValue: 5,
  //   validate: {
  //     min: 0,
  //     max: 5
  //   }
  // }
})

module.exports.associations = (Review, {Product, User}) => {
  Review.belongsTo(Product)
  Review.belongsTo(User)
}
