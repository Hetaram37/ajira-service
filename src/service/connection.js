'use strict'

const {
  errorGenerator
} = require('../lib/utils')
const SERVICE_CON = 'AS_C_S_'
const httpStatusCodes = require('http-status-codes')

const addNewConnections = (connection) => {
  console.log('addNewConnections() connection: %j', connection)
  if (isValidConnection(connection)) {
    connection = checkIfTargetItSelf(connection)
  }
  global.connection.push(connection)
  return global.connection
}

function checkIfTargetItSelf (connection) {
  const connectionIndex = connection.targets.indexOf(connection.source)
  if (connectionIndex !== -1) {
    connection.targets[connectionIndex] = undefined
  }
  return connection
}

function isValidConnection (connection) {
  if (connection && connection.source && connection.targets && Array.isArray(connection.targets)) {
    return true
  } else {
    console.error('Bad data')
    throw errorGenerator('Bad data', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
      'Bad request', null)
  }
}

module.exports = {
  addNewConnections
}
