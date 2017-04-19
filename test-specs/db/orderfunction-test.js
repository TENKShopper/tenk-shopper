'use strict'

const db = require('APP/db')
  , { Order, Product, LineItem } = db
  , { expect } = require('chai')
  , Promise = require('bluebird')

/* global describe it before beforeEach afterEach priceAtOrderTime */

describe('Order functionality', () => {
  before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  const blueShoes = {
      name: 'Blue Suede Shoes',
      price: 3500
    },
    redShoes = {
      name: 'Red Canvas Shoes',
      price: 4400
    },
    improperlyPricedShoes = {
      name: 'Improperly Priced Shoes',
      price: -10000
    },
    improperlyNamedShoes = {
      name: '',
    }

  let blueShoesRow, redShoesRow, badShoesRow

  describe('Product model', () => {

    it('creates products with valid attributes', () => {
      const blueShoesPromise = Product.create(blueShoes)
      .then(createdRow => createdRow)
      const redShoesPromise = Product.create(redShoes)
      .then(createdRow => createdRow)

      return Promise.all([blueShoesPromise, redShoesPromise])
      .spread((blueShoesInstance, redShoesInstance) => {
        blueShoesRow = blueShoesInstance
        redShoesRow = redShoesInstance
        expect(redShoesRow.name).to.equal('Red Canvas Shoes')
        expect(blueShoesRow.name).to.equal('Blue Suede Shoes')
        expect(blueShoesRow.price).to.equal(3500)
      })
    })

    describe('fails products with invalid attributes', () => {
      it('fails products with an empty name', (done) => {
        Product.build(improperlyNamedShoes)
        .validate()
        .then(err => {
          expect(err).to.exist
          expect(err.errors).to.exist
          expect(err.errors[0].path).to.equal('name')
          done()
        })
      })
      it('fails products with an invalid price', (done) => {
        Product.build(improperlyPricedShoes)
        .validate()
        .then(err => {
          expect(err).to.exist
          expect(err.errors).to.exist
          expect(err.errors[0].path).to.equal('price')
          done()
        })
      })
      it('fails products with an invalid photo URL', (done) => {
        Product.build({
          name: 'Shoes with Improper Photo',
          photo: 'notaphotoURL'
        })
        .validate()
        .then(err => {
          expect(err).to.exist
          expect(err.errors).to.exist
          expect(err.errors[0].path).to.equal('photo')
          done()
        })
      })
    })
  })

  describe('Order model', () => {
    it('creates products with valid attributes', (done) => {
      Order.create({
        instructions: 'I am a dummy order'
      })
      .then(createdOrder => {
        expect(createdOrder.instructions).to.equal('I am a dummy order')
        done()
      })
    })
    it('fails when attempting to create products with invalid attributes', (done) => {
      Order.create({
        shipping: 'NotAValidShippingMethod'
      })
      .catch(err => {
        expect(err).to.exist
        expect(err.name).to.equal('SequelizeDatabaseError')
        expect(err.message).to.equal('invalid input value for enum enum_orders_shipping: "NotAValidShippingMethod"')
        done()
      })
    })
    it('associates products with orders via the lineitems model', (done) => {
      Order.create({
        instructions: 'I am a dummy order',
      })
      .then(createdOrder => {
        return createdOrder.addProduct(blueShoesRow, {
          orderPrice: blueShoesRow.price,
          quantity: 1
        })
      })
      .then(orderWithProductAdded => {
        LineItem.findAll()
        .then(lineItems => {
          const newLineItem = lineItems[0]
          expect(newLineItem.orderPrice).to.equal(3500)
          expect(newLineItem.quantity).to.equal(1)
          done()
        })
      })
    })
    it('has withProductAndOrder scope defined, which will pull LineItem rows with associated Products and Orders', (done) => {
      LineItem.scope('withProductAndOrder').findAll()
      .then(lineItems => {
        const newLineItem = lineItems[0]
        expect(newLineItem.orderPrice).to.equal(3500)
        expect(newLineItem.quantity).to.equal(1)
        expect(newLineItem.product.name).to.equal('Blue Suede Shoes')
        expect(newLineItem.order.instructions).to.equal('I am a dummy order')
        done()
      })
    })
  })
})
