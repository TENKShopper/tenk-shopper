'use strict'

const db = require('APP/db')
  , { Order, Product, LineItem } = db
  , { expect } = require('chai')

/* global describe it before beforeEach afterEach priceAtOrderTime */

describe('Order functionality', () => {
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
      Product.create(blueShoes)
        .then(createdRow => {
          blueShoesRow = createdRow
          expect(blueShoesRow.title).to.equal('Blue Suede Shoes')
          expect(blueShoesRow.price).to.equal(35.00)
        })

      Product.create(redShoes)
        .then(createdRow => {
          redShoesRow = createdRow
          expect(redShoesRow.title).to.equal('Red Canvas Shoes')
        })
    })

    it('can find created products', () => {
      Product.findOne({
        where: {
          title: 'Blue Suede Shoes'
        }
      })
        .then(foundProduct => {
          expect(foundProduct.id).to.equal(1)
          expect(foundProduct.price).to.equal(35.00)
        })
    })
  })

  describe('Order model', () => {
    it('associates products with orders via the lineitems model', () => {
      Order.create({
        instructions: 'I am a dummy order',
      })
      .then(createdOrder => {
        createdOrder.addProduct(blueShoesRow, {
          priceAtOrderTime: blueShoesRow.price,
          quantity: 1
        })
        .then(() => {
          LineItem.find({ where: { product_id: 1 } })
            .then(foundLineItem => {
              expect(foundLineItem.priceAtOrderTime).to.equal(35.00)
            })
        })
      })
        .catch(console.error)
    })
  })
})

