const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'not verified', error: err });
      } else {
        req.decodedToken = decodedToken;
        console.log('here is what I see', decodedToken);
        next();
      }
    })
  } else {
    res.status(404).json({ message: 'no token provided' });
  }
};
