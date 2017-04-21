const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , { Address, User } = db
    , app = require('APP/server/start')

/* global describe it before afterEach */

// describe('/api/users', () => {
//   before('Await database sync', () => db.didSync)
//   afterEach('Clear the tables', () => db.sync({ force: true }))
//
//   describe('GET /:userId', () =>
//     describe('when not logged in', () =>
//       it('fails with a 401 (Unauthorized)', () =>
//         request(app)
//           .get(`/api/users/1`)
//           .expect(401)
//       )))
//
//   describe('POST', () =>
//     describe('when not logged in', () => {
//       it('creates a user', () =>
//         request(app)
//           .post('/api/users')
//           .send({
//             email: 'beth@secrets.org',
//             password: '12345'
//           })
//           .expect(201))
//
//       it('redirects to the user it just made', () =>
//         request(app)
//           .post('/api/users')
//           .send({
//             email: 'eve@interloper.com',
//             password: '23456',
//           })
//           .redirects(1)
//           .then(res => expect(res.body).to.contain({
//             email: 'eve@interloper.com'
//           })))
//     }))
// })

describe('Users API', () => {
  before('Await database sync', () => db.didSync)
  after('Sync the tables', () => db.sync({force: true}))

  const blueUser = {
      userName: 'blueUser',
      email: 'blueuser@gmail.com',
      password: 'bluePassword'
    },
    redUser = {
      userName: 'redUser',
      email: 'reduser@gmail.com',
      password: 'redPassword'
    },
    greenUser = {
      userName: 'greenUser',
      email: 'greenuser@gmail.com',
      password: 'greenPassword'
    },
    blueAddress = {
      country: 'USA',
      firstName: 'Omri Omri',
      lastName: 'Omri',
      administrativeArea: 'NY',
      locality: 'NYC',
      postalZipCode: '12345',
      streetAddress: '123 Omri Lane',
    },
    redAddress = {
      country: 'USA',
      firstName: 'Omri Omri',
      lastName: 'Omri',
      administrativeArea: 'NY',
      locality: 'NYC',
      postalZipCode: '12345',
      streetAddress: '123 Omri Lane',
    },
    greenAddress = {
      country: 'USA',
      firstName: 'Omri Omri',
      lastName: 'Omri',
      administrativeArea: 'NY',
      locality: 'NYC',
      postalZipCode: '12345',
      streetAddress: '123 Omri Lane',
    }

  before('Add dummy data to tables', () => {
    return User.create(blueUser)
    .then(newUser => {
      return Address.create(blueAddress)
      .then(newAddress => newUser.setShippingAddresses(newAddress))
    })
    .then(() => User.create(greenUser))
    .catch(console.error)
  })

  describe('/api/users', () => {
    it('can GET all users', done => {
      request(app)
      .get('/api/users/')
      .then(res => {
        expect(res.body[0].id).to.equal(2)
        expect(res.body.length).to.equal(2)
        expect(res.status).to.equal(200)
        done()
      })
      .catch(done)
    })

    it('can POST a new user', done => {
      request(app)
      .post('/api/users/')
      .send(redUser)
      .then(res => {
        expect(res.body.userName).to.equal('redUser')
        expect(res.status).to.equal(201)
        done()
      })
      .catch(done)
    })
  })

  describe('/api/users/:id', () => {
    it('can GET a specific user by id', done => {
      request(app)
      .get('/api/users/1')
      .then(res => {
        expect(res.body.userName).to.equal('blueUser')
        expect(res.body.email).to.equal('blueuser@gmail.com')
        done()
      })
      .catch(done)
    })

    it('can PUT to update a specific user...', done => {
      request(app)
      .put('/api/users/1')
      .send({
        userName: 'purpleUser'
      })
      .then(res => {
        expect(res.body.email).to.equal('blueuser@gmail.com')
        done()
      })
      .catch(done)
    })

    it('...and it can PUT to update that user again', done => {
      request(app)
      .put('/api/users/1')
      .send({
        userName: 'blueUser'
      })
      .then(res => {
        expect(res.body.userName).to.equal('blueUser')
        done()
      })
      .catch(done)
    })
  })
})
