'use strict'

const db = require('APP/db')
  , { Order, Product, LineItem } = db
  , { expect } = require('chai')

/* global describe it before beforeEach afterEach */

describe.only('Order functionality', () => {
  before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))

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
    }

  let blueShoesRow, redShoesRow, greenTrunksRow

  describe('Product model', () => {

    it('creates products successfully', () => {
      Product.bulkCreate([blueShoes, redShoes, greenTrunks])
        .then(data => {
          blueShoesRow = data[0]
          redShoesRow = data[1]
          greenTrunksRow = data[2]
          expect(blueShoesRow.title).to.equal('Blue Suede Shoes')
          expect(blueShoesRow.price).to.equal(35.00)
          expect(greenTrunksRow.title).to.equal('Green Trunks')
        })
    })

    it('can find created products', () => {
      Product.findOne({
        where: {
          title: 'Blue Suede Shoes'
        }
      })
        .then(foundProduct => {
          blueShoesRow = foundProduct
          expect(foundProduct.id).to.equal(1)
        })
    })
  })

  describe('Order model', () => {
    it('associates products with orders via the lineitems model', () => {
      Order.create({
        instructions: 'I am a dummy order',
      })
      .then(createdOrder => {
        return createdOrder.addProduct(blueShoesRow, {
          through: {
            priceAtOrderTime: blueShoesRow.price,
            quantity: 1
          }
        })
      })
      .then(() => {
        return LineItem.findAll()
        .then(allLineItems => console.log("allLineItems", allLineItems))
      })
      .catch(console.error)
    })
  })
})

