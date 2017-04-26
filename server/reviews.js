'use strict'

const db = require('APP/db')
  , Review = db.model('reviews')
  , router = require('express').Router()

module.exports = router

router.route('/')
.get((req, res, next) =>
  Review.findAll()
  .then(reviews => res.json(reviews))
  .catch(err => next(err))
)
.post((req, res, next) =>
  Review.create(req.body)
  .then(review => res.status(201).json(review))
  .catch(next)
)

router.param('id', (req, res, next, id) => {
  Review.findById(id)
  .then(foundReview => {
    req.review = foundReview
    next()
  })
  .catch(next)
})

router.route('/:id')
.get((req, res, next) => res.json(req.review))
.put((req, res, next) => {
  req.review.update(req.body)
  .then(updatedReview => {
    res.json(updatedReview)
  })
  .catch(next)
})
