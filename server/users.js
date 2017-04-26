'use strict'
const Promise = require('bluebird')

const passport = require('passport')
const db = require('APP/db')
const User = db.model('users'),
  Address = db.model('addresses'),
  Order = db.model('orders'),
  Review = db.model('reviews')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')
const router = require('express').Router()

module.exports = router

router.param('userId', (req, res, next, userId) => {
  User.find({where: {id: userId}})
  .then(targetUser => {
    if (!targetUser) return res.sendStatus(404)
    req.targetUser = targetUser
    next()
  })
  .catch(next)
})

router.route('/')
  // The forbidden middleware will fail *all* requests to list users.
  // Remove it if you want to allow anyone to list all users on the site.
  //
  // If you want to only let admins list all the users, then you'll
  // have to add a role column to the users table to support
  // the concept of admin users.
.get(forbidden('Must be admin user'), (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})
.post((req, res, next) => {
  User.create(req.body)
  .then(user => {
    req.login(user, (err) => {
      if (!err) res.redirect('/')
      else next(err)
    })
    // res.status(201).send(user)
  })
  .catch(next)
})

router.route('/:userId')
.get(mustBeLoggedIn, (req, res, next) => res.json(req.targetUser))
.put(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.update(req.body)
  .then(updatedUser => res.status(201).send(updatedUser))
  .catch(next)
})
.delete(forbidden('Must be admin user'), (req, res, next) => {
  req.targetUser.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

router.use('/:userId/addresses', require('./addresses'))

/* ------------- USER ORDER -------------- */

router.route('/checkoutOrders')
.post(mustBeLoggedIn, (req, res, next) => {
  Order.create(req.body.orderDetail)
  .then(newOrder => {
    const asyncOrders = req.body.productOrders.map(order => {
      return newOrder.addProduct(order.product.id, {
        orderPrice: order.orderPrice,
        quantity: order.quantity
      })
    })
    console.log(req.body.shippingAddress)
    Promise.all([
      newOrder.setShippingAddress(req.body.shippingAddress.id),
      newOrder.setBillingAddress(req.body.billingAddress.id),
      asyncOrders
    ])
    .then(() => req.user.addOrders([newOrder]))
    .then(() => res.status(201).json(req.user))
  })
  .catch(next)
})
