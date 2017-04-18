// 'use strict'
//
// const db = require('APP/db')
//     , {Address} = db
//     , {expect} = require('chai')
//
// /* global describe it before afterEach */
//
// describe('Address', () => {
//   before('Await database sync', () => db.didSync)
//   afterEach('Clear the tables', () => db.truncate({ cascade: true }))
//
//   describe('authenticate(plaintext: String) ~> Boolean', () => {
//     it('resolves true if the password matches', () =>
//       Address.create({ password: 'ok' })
//         .then(address => address.authenticate('ok'))
//         .then(result => expect(result).to.be.true))
//
//     it("resolves false if the password doesn't match", () =>
//       Address.create({ password: 'ok' })
//         .then(address => address.authenticate('not ok'))
//         .then(result => expect(result).to.be.false))
//   })
// })
