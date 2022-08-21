const Card = require('../models/card');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else if (req.user._id !== card.owner.toString()) {
        next(new ForbiddenError('Отсутствуют права для удаления данной карточки'));
      } else {
        Card.findByIdAndRemove(req.params.cardId).then((removedCard) => {
          res.send({ data: removedCard });
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий id карточки.'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          'Переданы некорректные данные для постановки лайка.',
        ));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий id карточки.'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      } else {
        next(err);
      }
    });
};
