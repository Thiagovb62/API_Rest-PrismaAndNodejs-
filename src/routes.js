const express = require('express');

const routes = express.Router();

const UserController = require('./controller/UserController')
const PostController = require('./controller/PostController')


//user routes
routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.showById)
routes.post('/user', UserController.create)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.delete)

// post routes
routes.get('/post', PostController.index)
routes.post('/post/user/:id', PostController.create)

module.exports = routes;