const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Симон де Бовуар',
      // default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'мыслительница',
      // default: 'Исследователь',
    },

    avatar: {
      type: String,
      // default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      default:
        'https://www.novochag.ru/upload/img_cache/e08/e08c959ebbe5335ba627a87fb73ce72a_ce_1042x720x56x0_cropped_666x444.jpg',
      validate: {
        validator(avatar) {
          return validator.isURL(avatar);
        },
        message: 'Не является ссылкой',
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Не является email',
      },
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator(password) {
          return validator.isStrongPassword(password);
        },
        message: 'Пароль недостаточно надёжный',
      },
      select: false,
    },
  },
  { versionKey: false, new: true, runValidators: true },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неправильные почта или пароль'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
