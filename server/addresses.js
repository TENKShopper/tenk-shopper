'use strict'

const db = require('APP/db')
const Address = db.model('addresses')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')
const router = require('express').Router()

module.exports = router

router.param('addressType', (req, res, next, addressType) => {
  if (addressType !== 'billingAddress' || addressType !== 'shippingAddress') {
    res.sendStatus(404).end()
  }
  req.addressType = addressType + 'es'
  next()
})

router.route('/:addressType')
.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['get' + req.addressType]()
 .then(shippingInfos => {
   res.json(shippingInfos)
 })
 .catch(next)
})
.post(mustBeLoggedIn, (req, res, next) => {
  Address.create(req.body)
 .then(newAddress => req.targetUser['add' + req.addressType]([newAddress]))
 .then(() => res.json(req.body))
 .catch(next)
})
.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['remove' + req.addressType]()
 .then(() => res.sendStatus(204))
 .catch(next)
})

/* --------- INDIVIDUAL ADDRESS ----------- */

router.route('/:addressType/:addressId')
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
 .then(updatedAddress => res.json(req.targetUser))
 .catch(next)
})
.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['remove' + req.addressType]({id: req.params.addressId})
 .then(() => res.json(req.targetUser))
 .catch(next)
})
