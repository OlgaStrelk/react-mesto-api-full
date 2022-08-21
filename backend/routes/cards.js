const router = require('express').Router();
const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, cardIdValidator } = require('../middlewares/validator');

router.post('/', cardValidator, createCard);

router.get('/', getCards);

router.delete('/:cardId', cardIdValidator, deleteCardById);

router.put('/:cardId/likes', cardIdValidator, likeCard);

router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
