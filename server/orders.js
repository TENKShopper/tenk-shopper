'use strict'

const db = require('APP/db')
    , Order = db.model('orders')
    , router = require('express').Router()

module.exports = router

router.route('/')
.get((req, res, next) =>
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next)
)
.post((req, res, next) =>
  Order.create(req.body)
  .then(order => res.status(201).json(order))
  .catch(next)
)

router.param('id', (req, res, next, id) => {
  Order.findById(id)
  .then(foundOrder => {
    req.order = foundOrder
    next()
  })
  .catch(next)
})

router.route('/:id')
.get((req, res, next) => res.json(req.order))
.put((req, res, next) => {
  req.order.update(req.body)
  .then(updatedOrder => {
    res.json(updatedOrder)
  })
  .catch(next)
})

