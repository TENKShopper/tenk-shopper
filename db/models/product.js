'use strict'

const { STRING, TEXT, INTEGER, FLOAT, ARRAY, BOOLEAN, ENUM } = require('sequelize')

module.exports = db => db.define('products', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
  photos: {
    type: ARRAY(STRING),
    defaultValue: ['http://placehold.it/500x500'],
    validate: {
      isUrl: true
    }
  },
  collections: {
    type: ARRAY(STRING),
    defaultValue: ['Spring 17']
  },
  gender: {
    type: ENUM('MEN', 'WOMEN', 'UNISEX'),
    defaultValue: 'UNISEX'
  },
  size: {
    type: ENUM('S', 'M', 'L'),
  },
  type: {
    type: ENUM('Shirts', 'Pants', 'Shoes')
  },
  available: {
    type: BOOLEAN,
    defaultValue: true
  },
  avgRating: {
    type: INTEGER,
    defaultValue: 5,
    validate: {
      min: 0,
      max: 5
    },
    get: () => {
      return this.reviews.reduce((sumRatings, review) => sumRatings + review.rating, 0) / this.reviews.length
    }
  }
}, {
  defaultScope: {
    include: [
      { model: db.model('reviews') }
    ]
  }
})

module.exports.associations = (Product, { Review, Order, LineItem }) => {
  Product.hasMany(Review)
  Product.belongsToMany(Order, { through: LineItem })
}
