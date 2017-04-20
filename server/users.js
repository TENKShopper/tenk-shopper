'use strict'

const db = require('APP/db')
const User = db.model('users'),
  Address = db.model('addresses'),
  Order = db.model('orders'),
  Review = db.model('reviews')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')
const router = require('express').Router()

module.exports = router

router.param(':userId', (req, res, next, userId) => {
  User.find({
    where: {id: userId},
    include: [
      {model: Address, as: 'shippingAddresses'},
      {model: Address, as: 'billingAddresses'},
      {model: Order, as: 'orders'},
      {model: Review, as: 'reviews'},
    ]
  })
  .then(targetUser => {
    if (!targetUser) return res.sendStatus(404)
    req.targetUser = targetUser
  })
  .catch(next)
})

router.param(':addressType', (req, res, next, addressType) => {
  if (addressType !== 'billingAddress' || addressType !== 'shippingAddress') {
    res.sendStatus(404).end()
  }
  req.addressType = addressType
  next()
})

router.route('/')
  // The forbidden middleware will fail *all* requests to list users.
  // Remove it if you want to allow anyone to list all users on the site.
  //
  // If you want to only let admins list all the users, then you'll
  // have to add a role column to the users table to support
  // the concept of admin users.
  .get(forbidden('listing users is not allowed'), (req, res, next) => {
    User.findAll({
      include: [
        {model: Address, as: 'shippingAddresses'},
        {model: Address, as: 'billingAddresses'},
        {model: Order, as: 'orders'},
        {model: Review, as: 'reviews'},
      ]
    })
      .then(users => res.json(users))
      .catch(next)
  })
  .post((req, res, next) => {
    User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
  })

router.route('/:userId')
  .get(mustBeLoggedIn, (req, res, next) => {
    res.json(req.targetUser)
  })
  .put(mustBeLoggedIn, (req, res, next) => {
    req.targetUser.update(res.body)
    .then(updatedUser => {
      res.json(updatedUser)
    })
    .catch(next)
  })
  .delete(forbidden('must be admin'), (req, res, next) => {
    req.targetUser.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
  })

/*  -------------- ADDRESSES ------------ */

router.route('/:userId/:addressType')
  .get(mustBeLoggedIn, (req, res, next) => {
    req.targetUser['get' + req.addressType]()
    .then(shippingInfos => {
      res.json(shippingInfos)
    })
    .catch(next)
  })
  .post(mustBeLoggedIn, (req, res, next) => {
    Address.create(res.body)
    .then(newAddress => req.targetUser['add' + req.addressType]([newAddress]))
    .then(() => res.json(res.body))
    .catch(next)
  })
  .delete(mustBeLoggedIn, (req, res, next) => {
    req.targetUser['remove' + req.addressType]()
    .then(() => res.sendStatus(204))
    .catch(next)
  })

/* --------- INDIVIDUAL ADDRESS ----------- */

router.route('/:userId/:addressType/:addressId')
  .get(mustBeLoggedIn, (req, res, next) => {
    req.targetUser['get' + req.addressType]({id: req.params.addressId})
    .then(shippingInfos => {
      res.json(shippingInfos)
    })
    .catch(next)
  })
  .put(mustBeLoggedIn, (req, res, next) => {
    req.targetUser['get' + req.addressType]({id: req.params.addressId})
    .then(targetAddress => targetAddress.update(req.body))
    .then(updatedAddress => res.json(updatedAddress))
    .catch(next)
  })
  .delete(mustBeLoggedIn, (req, res, next) => {
    req.targetUser['remove' + req.addressType]({id: req.params.addressId})
    .then(() => res.sendStatus(204))
    .catch(next)
  })
