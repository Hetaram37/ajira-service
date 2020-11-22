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
  findPath
} = require('../service/info-route')
const CONTROLLER_CONS = 'AS_I_C_'

const getPath = async (req, res, next) => {
  try {
    console.debug('getPath()')
    const from = req.query.from
    const to = req.query.to
    const response = await findPath(from, to)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while getting path: %s %j', error, error)
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
  getPath
}
