const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BedRequestError = require('../errors/BedRequestError');

const validatorUrl = (url) => {
  if (!validator.isURL(url)) {
    throw new BedRequestError('Невалидный URL');
  } else {
    return url;
  }
};

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validatorUrl),
    trailerLink: Joi.string().required().custom(validatorUrl),
    thumbnail: Joi.string().required().custom(validatorUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationMovieId,
  validationCreateMovie,
  validationUpdateUser,
};
