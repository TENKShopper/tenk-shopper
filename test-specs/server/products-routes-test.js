'use strict'

const request = require('supertest')
  , { expect } = require('chai')
  , Promise = require('bluebird')
  , db = require('APP/db')
  , { Order, Product, LineItem } = db
  , app = require('APP/server/start')

/* global describe it before beforeEach after afterEach priceAtOrderTime */

describe('Product API', () => {
  before('Await database sync', () => db.sync({force: true}))

  const blueShoes = {
      name: 'Blue Suede Shoes',
      price: 3500,
      photos: ['http://placehold.it/500x500']
    },
    redShoes = {
      name: 'Red Canvas Shoes',
      price: 4400
    },
    greenTrunks = {
      name: 'Green Trunks',
      price: 100000,
    }

  beforeEach('Add dummy data to tables', () => {
    // Use promise chaining to ensure blueShoes is created before redShoes.
    Product.create(blueShoes)
    .then(() => Product.create(redShoes))
  })

  after('Sync the tables', () => db.sync({force: true}))

  describe('/api/products', () => {

    it('can GET all products', done => {
      request(app)
      .get('/api/products/')
      .then(res => {
        expect(res.body[0].id).to.equal(1)
        expect(res.body.length).to.equal(2)
        expect(res.status).to.equal(200)
        done()
      })
      .catch(done)
    })

    it('can POST a new product', done => {
      request(app)
      .post('/api/products/')
      .send(greenTrunks)
      .then(res => {
        expect(res.body.name).to.equal('Green Trunks')
        expect(res.status).to.equal(201)
        done()
      })
      .catch(done)
    })

  })

  describe('/api/products/:id', () => {

    it('can GET a specific product by id', done => {
      request(app)
      .get('/api/products/1')
      .then(res => {
        expect(res.body.name).to.equal('Blue Suede Shoes')
        expect(res.body.available).to.be.true
        done()
      })
      .catch(done)
    })

    it('can PUT to update a specific product...', done => {
      request(app)
      .put('/api/products/1')
      .send({
        name: 'Blue Suede Pants'
      })
      .then(res => {
        expect(res.body.name).to.equal('Blue Suede Pants')
        done()
      })
      .catch(done)
    })

    it('...and it can PUT to update that product again', done => {
      request(app)
      .put('/api/products/1')
      .send({
        name: 'Blue Suede Shoes'
      })
      .then(res => {
        expect(res.body.name).to.equal('Blue Suede Shoes')
        done()
      })
      .catch(done)
    })

  })

})

