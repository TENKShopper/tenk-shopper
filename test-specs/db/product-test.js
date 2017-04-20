'use strict'

const request = require('supertest')
  , { expect } = require('chai')
  , Promise = require('bluebird')
  , db = require('APP/db')
  , { Product } = db

/* global describe it before beforeEach after afterEach priceAtOrderTime */

describe('Product model', () => {
  before('Await database sync', () => db.sync({force: true}))
  after('Sync the tables', () => db.sync({force: true}))

  const blueShoes = {
      name: 'Blue Suede Shoes',
      price: 3500,
      photos: ['http://placehold.it/500x500']
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
    },
    shoesWithBadPhotos = {
      name: 'Shoes with Improper Photo',
      photos: ['notaphotoURL']
    }

  it('creates products with valid attributes', done => {
    const blueShoesPromise = Product.create(blueShoes)
    .then(createdRow => createdRow)
    const redShoesPromise = Product.create(redShoes)
    .then(createdRow => createdRow)

    Promise.all([blueShoesPromise, redShoesPromise])
    .spread((blueShoesInstance, redShoesInstance) => {
      expect(redShoesInstance.name).to.equal('Red Canvas Shoes')
      expect(blueShoesInstance.name).to.equal('Blue Suede Shoes')
      expect(blueShoesInstance.price).to.equal(3500)
      done()
    })
  })

  describe('fails products with invalid attributes', () => {

    it('fails products with an empty name', done => {
      Product.build(improperlyNamedShoes)
      .validate()
      .then(err => {
        expect(err).to.exist
        expect(err.errors).to.exist
        expect(err.errors[0].path).to.equal('name')
        done()
      })
    })

    it('fails products with an invalid price', done => {
      Product.build(improperlyPricedShoes)
      .validate()
      .then(err => {
        expect(err).to.exist
        expect(err.errors).to.exist
        expect(err.errors[0].path).to.equal('price')
        done()
      })
    })

    it('fails products with an invalid photo URL', done => {
      Product.build(shoesWithBadPhotos)
      .validate()
      .then(err => {
        expect(err).to.exist
        expect(err.errors).to.exist
        expect(err.errors[0].path).to.equal('photos')
        done()
      })
    })
  })
})
