const router = require('express').Router()

module.exports = router

router.use((req, res, next) => {
  if (!req.session.pendingOrders) {
    req.session.pendingOrders = []
  }
  next()
})

router.route('/')
.get((req, res, next) => {
  res.json(req.session.pendingOrders)
})
.post((req, res, next) => {
  req.session.pendingOrders = [ req.body.productOrder, ...req.session.pendingOrders ]
  res.json(req.session.pendingOrders[0])
})
.delete((req, res, next) => {
  req.session.pendingOrders = []
  res.sendStatus(204).end()
})
