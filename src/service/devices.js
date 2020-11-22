'use strict'

const {
  errorGenerator
} = require('../lib/utils')
const SERVICE_CON = 'AS_D_S_'
const httpStatusCodes = require('http-status-codes')

const addNewDevice = (device) => {
  console.log('AddNewDevice() device: %j', device)
  if (isValidDevice(device) && isUniqueDevice(device)) {
    console.log('It is a valid device')
    global.device.push(device)
  }
  console.log('Final device list: %j', global.device)
  return global.device
}

const listAllDevice = () => {
  console.log('device list: %j', global.device)
  return global.device
}

const increaseDeviceStrength = async (strength, deviceName) => {
  console.log('increaseDeviceStrength() strength: %j, deviceName: %s', strength, deviceName)
  if (parseInt(strength.value) && parseInt(strength.value) > -1) {
    const deviceIndex = global.device.findIndex(device => device.name === deviceName && device.type === 'COMPUTER')
    if (deviceIndex !== -1) {
      global.device[deviceIndex].strength = strength.value
    } else {
      console.error('Device not found')
      throw errorGenerator('Device not found', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
        'Bad request', null)
    }
  } else {
    console.error('Invalid strength')
    throw errorGenerator('Invalid strength', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
      'Bad request', null)
  }
}

function isValidDevice (device) {
  const deviceTypes = ['COMPUTER', 'REPEATER']
  if (device && device.type && deviceTypes.indexOf(device.type) !== -1 && device.name && device.name.length > 0) {
    return true
  } else {
    console.error('Bad data')
    throw errorGenerator('Bad data', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
      'Bad request', null)
  }
}

function isUniqueDevice (device) {
  console.log('isUniqueDevice() device: %j', device)
  const deviceIndex = global.device.findIndex(dev => dev.name === device.name)
  console.log('Device index: ', deviceIndex)
  if (deviceIndex !== -1) {
    console.error('Duplicate device name')
    throw errorGenerator('Duplicate device name', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
      'Bad request', null)
  } else {
    return true
  }
}

module.exports = {
  addNewDevice,
  listAllDevice,
  increaseDeviceStrength
}
