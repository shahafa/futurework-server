const chalk = require('chalk');
const jwt = require('express-jwt');
const userController = require('../controllers/user');

const authenticate = jwt({ secret: process.env.JWT_SECRET });

function routesConfig(app) {
  app.get('/v1/test', authenticate, (req, res) => { res.send('Hello World!'); });

  app.post('/v1/login', userController.login);
  app.post('/v1/signup', userController.signup);

  console.log('%s Routes configured successfully', chalk.green('✓'));
}

module.exports = routesConfig;
