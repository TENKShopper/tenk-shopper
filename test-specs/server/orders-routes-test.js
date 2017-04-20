'use strict'

const request = require('supertest')
  , { expect } = require('chai')
  , Promise = require('bluebird')
  , db = require('APP/db')
  , { Order, Product, LineItem } = db
  , app = require('APP/server/start')

/* global describe it before beforeEach after afterEach priceAtOrderTime */

describe('Orders API', () => {
  before('Await database sync', () => db.didSync)
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
    greenTrunks = {
      name: 'Green Trunks',
      price: 100000,
    },
    internationalOrder = {
      instructions: 'I am a dummy order',
      shipping: 'International'
    },
    twoDayOrder = {
      instructions: 'I\'m a dummy order too!',
      shipping: 'Two-Day'
    },
    thirdOrder = {
      instructions: 'I was POSTed',
      shipping: 'Two-Day'
    }

  beforeEach('Add dummy data to tables', () => {
    // Use promise chaining to ensure internationalOrder is created before twoDayOrder.
    return Order.create(internationalOrder)
    .then(() => Order.create(twoDayOrder))
  })

  describe('/api/orders', () => {

    it('can GET all orders', done => {
      request(app)
      .get('/api/orders/')
      .then(res => {
        expect(res.body[0].id).to.equal(1)
        expect(res.body.length).to.equal(2)
        expect(res.status).to.equal(200)
        done()
      })
      .catch(done)
    })

    it('can POST a new order', done => {
      request(app)
      .post('/api/orders/')
      .send(thirdOrder)
      .then(res => {
        expect(res.body.instructions).to.equal('I was POSTed')
        expect(res.status).to.equal(201)
        done()
      })
      .catch(done)
    })
  })

  describe('/api/products/:id', () => {

    it('can GET a specific order by id', done => {
      request(app)
      .get('/api/orders/1')
      .then(res => {
        expect(res.body.instructions).to.equal('I am a dummy order')
        expect(res.body.shipping).to.equal('International')
        done()
      })
      .catch(done)
    })

    it('can PUT to update a specific order...', done => {
      request(app)
      .put('/api/orders/1')
      .send({
        shipping: 'Two-Day'
      })
      .then(res => {
        expect(res.body.shipping).to.equal('Two-Day')
        done()
      })
      .catch(done)
    })

    it('...and it can PUT to update that product again', done => {
      request(app)
      .put('/api/orders/1')
      .send({
        shipping: 'International'
      })
      .then(res => {
        expect(res.body.shipping).to.equal('International')
        done()
      })
      .catch(done)
    })
  })
})

