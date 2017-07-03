const chalk = require('chalk');
const jwt = require('express-jwt');
const userController = require('../controllers/user');
const profileController = require('../controllers/profile');

// const stipeKeyPublishable = process.env.PUBLISHABLE_KEY;
// const stripeKeySecret = process.env.SECRET_KEY;
// const stripe = require("stripe")(stripeKeySecret);

const authenticate = jwt({ secret: process.env.JWT_SECRET });

function routesConfig(app) {
  app.get('/v1/test', authenticate, (req, res) => { res.send('Hello World!'); });

  app.get('/v1/profile/:id', authenticate, profileController.get);
  app.post('/v1/profile', authenticate, profileController.add);
  app.put('/v1/profile/:id', authenticate, profileController.update);

  app.post('/v1/login', userController.login);
  app.post('/v1/signup', userController.signup);

  // app.get('/v1/payment', authenticate, controller);

  console.log('%s Routes configured successfully', chalk.green('✓'));
}

module.exports = routesConfig;
