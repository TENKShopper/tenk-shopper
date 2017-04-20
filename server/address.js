'use strict'

const db = require('APP/db')
const Address = db.model('addresses')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')
const router = require('express').Router()

/*  -------------- SHIPPING ADDRESS ------------- */

router.route('/shippingInfo')

.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.getShippingAddresses()
  .then(shippingInfos => {
    res.json(shippingInfos)
  })
  .catch(next)
})

.post(mustBeLoggedIn, (req, res, next) => {
  Address.create(res.body)
  .then(newAddress => req.targetUser.addShippingAddresses([newAddress]))
  .then(() => res.json(res.body))
  .catch(next)
})

.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

router.route('/shippingInfo/:addressId')

.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.getShippingAddresses({id: req.params.addressId})
  .then(shippingInfos => {
    res.json(shippingInfos)
  })
  .catch(next)
})

.put(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.getShippingAddresses({id: req.params.addressId})
  .then(targetAddress => targetAddress.update(req.body))
  .then(updatedAddress => res.json(updatedAddress))
  .catch(next)
})

.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.removeShippingAddresses({id: req.params.addressId})
  .then(() => res.sendStatus(204))
  .catch(next)
})

/*  -------------- BILLING INFO ------------- */

router.route('/billingInfo')

.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.getBillingAddresses()
  .then(billingInfos => {
    res.json(billingInfos)
  })
  .catch(next)
})

.post(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.addBillingAddresses([res.body])
  .then(() => res.json(res.body))
  .catch(next)
})

.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.removeBillingAddresses()
  .then(() => res.sendStatus(204))
  .catch(next)
})

router.route('/billingInfo/:addressId')

.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.getBillingAddresses({id: req.params.addressId})
  .then(billingInfos => {
    res.json(billingInfos)
  })
  .catch(next)
})

.put(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.getShippingAddresses({id: req.params.addressId})
  .then(targetAddress => targetAddress.update(req.body))
  .then(updatedAddress => res.json(updatedAddress))
  .catch(next)
})

.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser.removeBillingAddresses({id: req.params.addressId})
  .then(() => res.sendStatus(204))
  .catch(next)
})

/*  -------------- ALL IN ONE TEST ------------- */

router.param(':addressType', (req, res, next, addressType) => {
  req.addressMethod = addressType === 'billingAddress' ? 'BillingAddresses' : 'ShippingAddresses'
  next()
})

router.route('/:addressType')

.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['get' + req.addressMethod]()
  .then(shippingInfos => {
    res.json(shippingInfos)
  })
  .catch(next)
})

.post(mustBeLoggedIn, (req, res, next) => {
  Address.create(res.body)
  .then(newAddress => req.targetUser['add' + req.addressMethod]([newAddress]))
  .then(() => res.json(res.body))
  .catch(next)
})

.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['remove' + req.addressMethod]()
  .then(() => res.sendStatus(204))
  .catch(next)
})

router.route('/shippingInfo/:addressId')

.get(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['get' + req.addressMethod]({id: req.params.addressId})
  .then(shippingInfos => {
    res.json(shippingInfos)
  })
  .catch(next)
})

.put(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['get' + req.addressMethod]({id: req.params.addressId})
  .then(targetAddress => targetAddress.update(req.body))
  .then(updatedAddress => res.json(updatedAddress))
  .catch(next)
})

.delete(mustBeLoggedIn, (req, res, next) => {
  req.targetUser['remove' + req.addressMethod]({id: req.params.addressId})
  .then(() => res.sendStatus(204))
  .catch(next)
})
