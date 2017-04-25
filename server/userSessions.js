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
  req.session.pendingOrders = [ req.body.pendingOrder, ...req.session.pendingOrders ]
  res.json(req.session.pendingOrders[0])
})
