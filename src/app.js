'use strict'

const express = require('express')
const app = express()

require('./middleware')(app)
require('./route')(app)

global.device = []
global.connection = []

module.exports = app
