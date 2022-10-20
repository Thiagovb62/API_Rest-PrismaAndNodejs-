const express = require('express');

const routes = express.Router();

const UserController = require('./controller/UserController')

routes.get('/user', UserController.index)
routes.post('/user', UserController.create)
module.exports = routes;