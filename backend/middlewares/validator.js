const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../utils/regex');

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regEx),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const profileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regEx),
  }),
});

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regEx),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  userValidator,
  userIdValidator,
  profileValidator,
  avatarValidator,
  cardValidator,
  cardIdValidator,
};
