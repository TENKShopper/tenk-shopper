'use strict'

const db = require('APP/db')
  , { Order, Product, LineItem } = db
  , { expect } = require('chai')

/* global describe it before afterEach */

describe('Order', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('calculateTotal', () => {
    const blueShoes = {
      title: 'Blue Suede Shoes',
      price: 35.00
    }
    const redShoes = {
      title: 'Red Canvas Shoes',
      price: 44.00
    }
    const greenTrunks = {
      title: 'Green Trunks',
      price: 23.00
    }
    beforeEach('seed with dummy product', () => {
      Product.bulkCreate([blueShoes, redShoes, greenTrunks])
    })
    beforeEach('create order with line items', () => {
      Order.create({})
        .then(createdOrder => {
          createdOrder.addLineItems({
            where: {

            }
          })
        })
    })

  })
  it('resolves true if the password matches', () =>
    User.create({ password: 'ok' })
      .then(user => user.authenticate('ok'))
      .then(result => expect(result).to.be.true))

  it("resolves false if the password doesn't match", () =>
    User.create({ password: 'ok' })
      .then(user => user.authenticate('not ok'))
      .then(result => expect(result).to.be.false))
})
})
