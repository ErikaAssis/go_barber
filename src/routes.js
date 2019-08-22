const express = require('express');
const upload = require('multer')(require('./config/multer'));

const UserController = require('./app/controllers/UserController');

const routes = express.Router();

routes.get('/signup', UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);
module.exports = routes;
