const express = require('express');
const upload = require('multer')(require('./config/multer'));

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const DashboardController = require('./app/controllers/DashboardController');
const FileController = require('./app/controllers/FileController');
const AppointmentController = require('./app/controllers/AppointmentController');
const AvailableController = require('./app/controllers/AvailableController');

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');
const guestMiddleware = require('./app/middlewares/guest');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/files/:file', FileController.show);

routes.get('/', guestMiddleware, SessionController.create);
routes.post('/signin', SessionController.store);

routes.get('/signup', guestMiddleware, UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

routes.use('/app', authMiddleware);
routes.get('/app/logout', SessionController.destroy);

routes.get('/app/dashboard', DashboardController.index);

routes.get('/app/appointments/new/:provider', AppointmentController.create);
routes.post('/app/appointments/new/:provider', AppointmentController.story);

routes.get('/app/available/:provider', AvailableController.index);

module.exports = routes;
