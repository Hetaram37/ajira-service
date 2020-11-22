'use strict'

const {
  responseGenerators,
  getStatusCode,
  errorGenerator
} = require('../lib/utils')
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} = require('http-status-codes')
const {
  addNewDevice,
  listAllDevice,
  increaseDeviceStrength
} = require('../service/devices')
const CONTROLLER_CONS = 'AS_D_C_'

const addDevice = async (req, res, next) => {
  try {
    console.debug('addDevice()')
    const response = await addNewDevice(req.body)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while adding new device: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const listDevice = async (req, res, next) => {
  try {
    console.debug('listDevice()')
    const response = await listAllDevice()
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while getting all device list: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const deviceStrength = async (req, res, next) => {
  try {
    console.debug('deviceStrength()')
    const deviceName = req.params.device_name
    const response = await increaseDeviceStrength(req.body, deviceName)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while updating device strength: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

module.exports = {
  addDevice,
  listDevice,
  deviceStrength
}
