const express = require('express');

const routes = express.Router();

const UserController = require('./controller/UserController')

routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.showById)
routes.post('/user', UserController.create)
routes.delete('/user/:id', UserController.delete)
module.exports = routes;