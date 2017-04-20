const db = require('APP/db')
  , { Order, Product, LineItem } = db
  , { expect } = require('chai')
  , Promise = require('bluebird')

/* global describe it before beforeEach after afterEach priceAtOrderTime */

describe('Order model', () => {
  before('Await database sync', () => db.didSync)
  after('Sync the tables', () => db.sync({force: true}))

  const blueShoesData = {
      name: 'Blue Suede Shoes',
      price: 3500
    },
    dummyOrderData = {
      instructions: 'I am a dummy order'
    }

  let blueShoesInstance, dummyOrderInstance

  before(() => {
    const blueShoesPromise = Product.create(blueShoesData)
    .then(createdRow => createdRow)
    const dummyOrderPromise = Order.create(dummyOrderData)
    .then(createdOrder => createdOrder)
    .catch(console.error)

    return Promise.all([blueShoesPromise, dummyOrderPromise])
    .then(data => {
      blueShoesInstance = data[0]
      dummyOrderInstance = data[1]
    })
    .catch(console.error)
  })

  it('creates products with valid attributes', () => {
    expect(dummyOrderInstance.instructions).to.equal('I am a dummy order')
  })

  it('fails when attempting to create products with invalid attributes', done => {
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

  describe('associates products with orders via the lineitems model', () => {

    before('run addProduct', () => {
      return dummyOrderInstance.addProduct(blueShoesInstance, {
        orderPrice: blueShoesInstance.price,
        quantity: 1
      })
    })

    it('associates products with orders via the lineitems model', done => {
      LineItem.findAll()
      .then(lineItems => {
        const newLineItem = lineItems[0]
        expect(newLineItem.orderPrice).to.equal(3500)
        expect(newLineItem.quantity).to.equal(1)
        done()
      })
      .catch(done)
    })

    it('has a withProductAndOrder scope defined, which will pull LineItem rows with associated Products and Orders', done => {
      LineItem.scope('withProductAndOrder').findAll()
      .then(lineItems => {
        const newLineItem = lineItems[0]
        expect(newLineItem.orderPrice).to.equal(3500)
        expect(newLineItem.quantity).to.equal(1)
        expect(newLineItem.product.name).to.equal('Blue Suede Shoes')
        expect(newLineItem.order.instructions).to.equal('I am a dummy order')
        done()
      })
      .catch(done)
    })
  })
})
