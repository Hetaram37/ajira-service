'use strict'

const router = require('express').Router()
const {
  getPath
} = require('../controller/info-route')

router.get('/info-routes', getPath)

module.exports = router
