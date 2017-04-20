'use strict'

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
.get(forbidden('must be admin'), (req, res, next) => {
  User.findAll()
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

router.use('/:userId/address', require('./addresses'))
