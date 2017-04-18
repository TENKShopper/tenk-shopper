'use strict'

const db = require('APP/db')
  , { Order, Product, LineItem } = db
  , { expect } = require('chai')

/* global describe it before beforeEach afterEach */

describe('Product', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  const blueShoes = {
    title: 'Blue Suede Shoes',
    price: 35.00
  },
    redShoes = {
      title: 'Red Canvas Shoes',
      price: 44.00
    },
    greenTrunks = {
      title: 'Green Trunks',
      price: 23.00
    };

  it('creates products successfully', () => {
    Product.create(blueShoes)
    .then(createdProduct => {
      expect(createdProduct).to.be.instanceof(Product);
    })
  })

  beforeEach('create line items', () => {
  })

  it('creates an order', () => {
    Order.create({})
    .then(createdOrder => expect(createdOrder).to.be.true)
  })
})
