'use strict'

const router = require('express').Router()
const {
  addConnection
} = require('../controller/connection')

router.post('/connections', addConnection)

module.exports = router
