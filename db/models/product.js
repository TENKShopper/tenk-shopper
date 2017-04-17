'use strict'

const Sequelize = require('sequelize')

module.exports = db => db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description : Sequelize.TEXT,

  price: {
    type: Sequelize.INTEGER,
    DefaultValue: 0.00
  },

  inventoryQuantity: Sequelize.INTEGER,

  photo: {
    type: Sequelize.STRING,
    allowNull: false
  },

  gender: Sequelize.STRING,

  clothingType: Sequelize.STRING

})


// module.exports.associations = (Product, {Order, Review}) => {
//   Product.hasMany(Review, {as: 'ProductReviews'})
//   Product.belongsToMany(Order, {through: 'ProductOrders'})
// }
