'use strict'

const db = require('APP/db')
const Product = db.model('products')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Product.findAll()
        .then(products => res.json(products))
        .catch(next))
  .post('/', (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .get('/:id', (req, res, next) =>
      Product.findById(req.params.id)
      .then(foundProduct => res.json(foundProduct))
      .catch(next))
