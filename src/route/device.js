'use strict'

const router = require('express').Router()
const {
  addDevice,
  listDevice,
  deviceStrength
} = require('../controller/devices')

router.post('/devices', addDevice)
router.get('/devices', listDevice)
router.put('/devices/:device_name/strength', deviceStrength)

module.exports = router
