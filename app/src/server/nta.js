'use strict'

const cors = require('cors')
const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const config = require("../config")
const routes = require('../backend/routes/routes')

var logger = require('../logger').logger.nta

// Configure CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-api-key, X-API-Key');

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.json());
routes(app)

app.listen(config.http_port, () => console.log('Server listening HTTP on port ' + config.http_port));


