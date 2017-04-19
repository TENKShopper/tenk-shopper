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
      title: 'Blue Suede Shoes',
      price: 3500
    },
    redShoes = {
      title: 'Red Canvas Shoes',
      price: 4400
    },
    improperlyPricedShoes = {
      title: 'Improperly Priced Shoes',
      price: -10000
    },
    improperlyNamedShoes = {
      title: '',
    }

  let blueShoesRow, redShoesRow, badShoesRow

  describe('Product model', () => {

    it('creates products with the right attributes', () => {
      const blueShoesPromise = Product.create(blueShoes)
      .then(createdRow => createdRow)
      const redShoesPromise = Product.create(redShoes)
      .then(createdRow => createdRow)

      return Promise.all([blueShoesPromise, redShoesPromise])
      .spread((blueShoesInstance, redShoesInstance) => {
        blueShoesRow = blueShoesInstance
        redShoesRow = redShoesInstance
        expect(redShoesRow.title).to.equal('Red Canvas Shoes')
        expect(blueShoesRow.title).to.equal('Blue Suede Shoes')
        expect(blueShoesRow.price).to.equal(3500)
      })
    })

    describe('fails products with the wrong attributes', () => {

      it('fails products with an empty title', (done) => {
        Product.build({
          title: ''
        })
        .validate()
        .then(err => {
          expect(err).to.exist
          expect(err.errors).to.exist
          expect(err.errors[0].path).to.equal('title')
          done()
        })
      })

      it('fails products with an invalid price', (done) => {
        Product.build({
          title: 'Improperly Priced Shoes',
          price: -10000
        })
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
          title: 'Shoes with Improper Photo',
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

    it('associates products with orders via the lineitems model', () => {
      return Order.create({
        instructions: 'I am a dummy order',
      })
      .then(createdOrder => {
        return createdOrder.addProduct(blueShoesRow, {
          priceAtOrderTime: blueShoesRow.price,
          quantity: 1
        })
      })
      .then(orderWithProductAdded => {
        return LineItem.findAll()
        .then(lineItems => {
          expect(lineItems[0].priceAtOrderTime).to.equal(3500)
        })
      })
      .catch(console.error)
    })

  })

})
