const router = require('express').Router();
const { createUser, login } = require('../controllers/auths');
const isAuthorized = require('../middlewares/isAuthorized');
const { userValidator } = require('../middlewares/validator');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signup', userValidator, createUser);

router.post('/signin', userValidator, login);

router.use(isAuthorized);

router.use('/cards', require('./cards'));

router.use('/users', require('./users'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
