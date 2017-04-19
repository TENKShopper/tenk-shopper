'use strict'

const db = require('APP/db')
    , {Address} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('Address', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('address validates allowNull correctly', () => {
    it('throws an error if any field is empty', (done) => {
      const testAddress = Address.build()
      testAddress.validate()
      .then(err => {
        expect(err).to.be.an('object')
        done()
      })
      .catch(done)
    })
  })

  describe('option methods functions correctly', () => {
    it('gets full name', (done) => {
      Address.create({country: 'USA', firstName: 'Omri Omri', lastName: 'Omri', administrativeArea: 'NY', locality: 'NYC', postalZipCode: '12345', streetAddress: '123 Omri Lane'})
      .then(address => {
        expect(address.fullName).to.be.equal('Omri Omri Omri')
        done()
      })
      .catch(done)
    })
  })
})
