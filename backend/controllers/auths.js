const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');

// const { NODE_ENV, JWT_SECRET } = process.env;
const DUPLICATED_DATA_ERROR = 11000;
const SAULT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SAULT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.code === DUPLICATED_DATA_ERROR) {
        next(new ConflictError('Данный email уже занят'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные пользователя'));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};
