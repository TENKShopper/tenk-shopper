'use strict'
const Promise = require('bluebird')
const db = require('APP/db')
    , {User, Address} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    let testUser

    before(done => {
      User.create({ email: 'test@gmail.com', password: 'ok' })
        .then(res => {
          testUser = res
          done()
        })
    })

    it('resolves true if the password matches', () => {
      testUser.authenticate('ok')
      .then(result => expect(result).to.be.true)
      .catch(err => console.error('error authenticating user password', err))
    })

    it("resolves false if the password doesn't match", () => {
      testUser.authenticate('not ok')
      .then(result => expect(result).to.be.false)
      .catch(err => console.error('error authenticating user password', err))
    })
  })

  describe('isGuest option method', () => {
    it('returns true if password does not exist', () => {
      User.create({email: 'tenk@gmail.com'})
        .then(guestUser => expect(guestUser.isGuest).to.be.true)
    })
  })

  describe('User Associations', () => {
    before(done => {
      const creatingUser = User.create({email: 'kido@kido.com'})
      const creatingAddress = Address.create({country: 'USA', firstName: 'Kido Kido', lastName: 'Kido', administrativeArea: 'NY', locality: 'NYC', postalZipCode: '12345', streetAddress: '123 Kido Lane'})

      Promise.all([creatingUser, creatingAddress])
      .spread((user, address) => {
        user.addShippingInfo([address])
        user.addBillingInfo([address])
        done()
      })
    })

    it('sets billing association correctly', () => {
      User.findOne({where: {
        email: 'kido@kido.com'
      }})
      .then(user => user.getBillingInfo())
      .then(billingInfo => {
        expect(billingInfo.length).to.equal(1)
        expect(billingInfo[0].fullName).to.equal('Kido Kido Kido')
      })
    })
  })
})
