'use strict'

const deviceRoute = require('./device')
const connectionRoute = require('./connections')
const infoRoute = require('./info-route')

module.exports = (app) => {
  app.use('/ajiranet/process', deviceRoute)
  app.use('/ajiranet/process', connectionRoute)
  app.use('/ajiranet/process', infoRoute)
}
