const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = (req, res) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    return res.send({
      message: 'Validation Failed',
      errors,
    });
  }

  User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      return res.send({
        message: 'Something bad happened :(',
        errors: err,
      });
    }

    if (!user) {
      return res.send({ message: 'Invalid email or password.' });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.send({
          message: 'Something bad happened :(',
          errors: err,
        });
      }

      if (isMatch) {
        const token = jwt.sign({ profile: user.profile }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.send({
          message: 'Login success.',
          token,
        });
      }

      return res.send({ message: 'Invalid email or password.' });
    });
  });
};


const signup = (req, res) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    return res.send({
      message: 'Validation Failed',
      errors,
    });
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      email: req.body.email,
    },
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return res.send({
        message: 'Something bad happened :(',
        errors: err,
      });
    }

    if (existingUser) {
      return res.send({ message: 'Account with that email address already exists.' });
    }

    user.save((err) => {
      if (err) {
        return res.send({
          message: 'Something bad happened :(',
          errors: err,
        });
      }

      return res.send({ message: 'User signed up successfully.' });
    });
  });
};

module.exports = {
  login,
  signup,
};
