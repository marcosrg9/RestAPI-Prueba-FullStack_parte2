const Router = require('express').Router();
const { API } = require('./api.routes');

Router.use('/api',[], API)

module.exports = { Router }