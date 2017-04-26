const router = require('express').Router()

module.exports = router

router.route('/')
.get((req, res, next) => {
  if (!req.session.pendingOrders) {
    req.session.pendingOrders = []
  }
  res.json(req.session.pendingOrders)
})
.post((req, res, next) => {
  if (!req.session.pendingOrders) {
    req.session.pendingOrders = []
  }
  req.session.pendingOrders = [ req.body.productOrder, ...req.session.pendingOrders ]
  res.json(req.session.pendingOrders[0])
})
.delete((req, res, next) => {
  req.session.pendingOrders = []
  res.sendStatus(204).end()
})
