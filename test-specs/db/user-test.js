'use strict'
const Promise = require('bluebird')
const db = require('APP/db')
    , {User, Address} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.sync({ force: true }))

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    let testUser

    before(done => {
      User.create({ email: 'test@test.com', password: 'ok' })
        .then(user => {
          testUser = user
          done()
        })
        .catch(done)
    })

    it('resolves true if the password matches', (done) => {
      testUser.authenticate('ok')
      .then(result => {
        expect(result).to.be.true
        done()
      })
      .catch(done)
    })

    it("resolves false if the password doesn't match", (done) => {
      testUser.authenticate('not ok')
      .then(result => {
        expect(result).to.be.false
        done()
      })
      .catch(done)
    })
  })

  describe('isGuest option method', () => {
    let guestUser

    before(done => {
      User.create({email: 'tenk@gmail.com'})
        .then(user => {
          guestUser = user
          done()
        })
        .catch(done)
    })

    it('returns true if password does not exist', () => {
      expect(guestUser.isGuest).to.be.true
    })

    it('authenticate password will return false when user is a guest', (done) => {
      guestUser.authenticate('random')
      .then(result => {
        expect(result).to.be.false
        done()
      })
      .catch(done)
    })
  })

  describe('User Associations', () => {
    let testUser
    let testAddress
    let testAddress2

    beforeEach(done => {
      const creatingUser = User.create({email: 'kido@kido.com'})
      const creatingAddress = Address.create({country: 'USA', firstName: 'Kido Kido', lastName: 'Kido', administrativeArea: 'NY', locality: 'NYC', postalZipCode: '12345', streetAddress: '123 Kido Lane'})
      const creatingAddress2 = Address.create({country: 'USA', firstName: 'John John', lastName: 'John', administrativeArea: 'NY', locality: 'NYC', postalZipCode: '12345', streetAddress: '123 Kido Lane'})

      Promise.all([creatingUser, creatingAddress, creatingAddress2])
      .spread((user, address, address2) => {
        testAddress = address
        testAddress2 = address2
        testUser = user
        done()
      })
      .catch(done)
    })

    it('sets association correctly', (done) => {
      testUser.setBillingAddresses(testAddress)
      .then(() => testUser.getBillingAddresses())
      .then(billingInfo => {
        expect(billingInfo.length).to.equal(1)
        expect(billingInfo[0].fullName).to.equal('Kido Kido Kido')
        done()
      })
      .catch(done)
    })

    it('can have multiple associations', (done) => {
      testUser.setBillingAddresses(testAddress)
      .then(() => testUser.addBillingAddresses([testAddress2]))
      .then(() => testUser.getBillingAddresses())
      .then((billingInfos) => {
        expect(billingInfos.length).to.equal(2)
        expect(billingInfos[1].fullName).to.equal('John John John')
        done()
      })
      .catch(done)
    })
  })
})
