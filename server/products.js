'use strict'

const db = require('APP/db')
  , Product = db.model('products')
  , router = require('express').Router()

module.exports = router

router.route('/')
.get((req, res, next) =>
  Product.findAll()
  .then(products => res.json(products))
  .catch(err => next(err))
)
.post((req, res, next) =>
  Product.create(req.body)
  .then(product => res.status(201).json(product))
  .catch(next)
)

router.param('id', (req, res, next, id) => {
  Product.findById(id)
  .then(foundProduct => {
    req.product = foundProduct
    next()
  })
  .catch(next)
})

router.route('/:id')
.get((req, res, next) => res.json(req.product))
.put((req, res, next) => {
  req.product.update(req.body)
  .then(updatedProduct => {
    res.json(updatedProduct)
  })
  .catch(next)
})

