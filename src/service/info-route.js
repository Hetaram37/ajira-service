'use strict'

const {
  errorGenerator
} = require('../lib/utils')
const SERVICE_CON = 'AS_I_S_'
const httpStatusCodes = require('http-status-codes')

const findPath = async (from, to) => {
  if (from === to) {
    return { source: from, destination: to }
  }
  const device = global.device.find(de => de.name === from)
  if (device && device.type === 'COMPUTER') {
    const connection = global.connection.find(conn => conn.source === device.name)
    if (!device.strength) {
      device.strength = 5
    }
    if (connection && device.strength > 0) {
      if (connection.targets.indexOf(to) !== -1) {
        return { source: from, destination: to }
      } else {
      }
    } else {
      console.error('Path not found')
      throw errorGenerator('Path not found', SERVICE_CON + httpStatusCodes.OK,
        'No path found', null)
    }
  } else {
    console.error('Invalid device')
    throw errorGenerator('Invalid device', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
      'Bad request', null)
  }
}

module.exports = {
  findPath
}
