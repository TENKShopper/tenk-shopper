'use strict'

const db = require('APP/db')
  , Product = db.model('products')
  , router = require('express').Router()

module.exports = router

router.route('/')
.get((req, res, next) =>
  Product.findAll()
  .then(products => res.json(products))
  .catch(next)
)
.post((req, res, next) =>
  Product.create(req.body)
  .then(product => res.status(201).json(product))
  .catch(next)
)
// TODO: why isn't this working in the test, but is working in Postman? foundProduct is null here.
router.param('id', (req, res, next, id) => {
  Product.findById(id)
  .then(foundProduct => {
    console.log('foundProduct', foundProduct)
    req.product = foundProduct
    next()
  })
  .catch(next)
})

router.route('/:id')
.get((req, res, next) => res.json(req.product))
.put((req, res, next) => {
  Product.update(req.product, {
    where: {
      id: req.product.id
    }
  })
  .then(res => {
    console.log('res.data', res.data)
  })
  .catch(next)
})

