require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const AuthController = {
  register: (req, res) => {
    User
      .create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  login: (req, res) => {
    User
      .findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
          res.status(403).json({ message: 'Email or Password is wrong'});
        } else {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              id: user._id,
              name: user.name,
              email: user.email
            }
            res.status(200).json({ access_token: jwt.sign(payload, process.env.JWT_SECRET) });
          } else {
            res.status(403).json({ message: 'Email or Password is wrong'})
          }
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = AuthController;
